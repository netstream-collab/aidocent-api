import { Injectable, Logger } from '@nestjs/common';
import { OpenAI } from 'openai';
import { isEmpty } from '../common/text.util';
import { ChatGptMessage } from './types/chat-message.type';
import Codes from 'src/server/constants/codes';

@Injectable()
export class ChatGptService {
  private openai: OpenAI;
  private logger = new Logger(ChatGptService.name);
  private readonly REST_KEY = process.env.OPENAI_API_KEY;

  private readonly timeout = 30 * 1000;

  constructor() {
    this.openai = new OpenAI({
      apiKey: this.REST_KEY,
    });
  }

  async listModel() {
    const list = await this.openai.models.list();
    this.logger.debug(list);
    return list;
  }

  /**
   * chat: chat-gpt의 기능중 하나로, 문맥을 파악해 답변을 내고싶을때 사용함
   * Completions: 모델을 통해 나온 결과를 뜻함
   * @link https://www.npmjs.com/package/openai
   * @param messages
   * @param timeoutCb
   */
  async createChat(messages: ChatGptMessage[], reqModel?: string, timeoutCb?: (err: any) => any) {
    try {
      if (isEmpty(messages)) return null;
      const model = this.getModel(reqModel);
      this.logger.debug('> GPT messages: ', messages);
      this.logger.debug('> GPT model: ', model);

      const completion = await this.openai.chat.completions.create(
        {
          model: model,
          messages: messages,
        },
        {
          timeout: this.timeout,
        },
      );

      this.logger.debug('chatGPT usage tokens: ', completion.usage);
      const answer = completion.choices[0]?.message;
      return { completion, answer };
    } catch (error) {
      this.logger.debug(error);

      if (error.code == 'ECONNABORTED') {
        // timeout이 걸림
        if (timeoutCb) {
          timeoutCb(error);
        }
      }

      const errRes = error.response;
      console.log(errRes?.data);
      throw new Error(errRes.message);
      // if (errRes) throw new BasicException(500, errRes.statusText, errRes.data);
      // else throw new BasicException(500, errRes.message);
    }
  }

  async createChatStream(messages: ChatGptMessage[], reqModel?: string) {
    if (isEmpty(messages)) return null;
    const model = this.getModel(reqModel);
    this.logger.debug('> GPT messages: ', messages);
    this.logger.debug('> GPT model: ', model);

    const stream = await this.openai.chat.completions.create(
      {
        model: model,
        messages: messages,
        stream: true,
      },
      {
        timeout: this.timeout,
      },
    );
    return stream;
  }

  /**
   * gpt-4, gpt-4-0613, gpt-3.5-turbo
   * @link https://platform.openai.com/docs/models/model-endpoint-compatibility
   */
  getModel(model: string) {
    if (!Codes.LLMModels.includes(model)) {
      return Codes.LLMModels[0];
    }
    return model;
  }
}
