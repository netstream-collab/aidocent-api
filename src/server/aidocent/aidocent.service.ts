import { Injectable, Logger } from '@nestjs/common';
import { ChatGptMessage, ChatGptService } from '../utils/chat-gpt/chat-gpt.service';
import { BasicResponse } from '../constants/response/basicResponse';
import { ChatAskToAiDTO, ChatAskToQueryDTO } from './dto/chat-ask-to-ai.dto';
import ChatHisDAL from './dal/layers/chatHis.dal';
import { ProjCreateDTO } from './dto/proj-create.dto';
import ProjDAL from './dal/layers/proj.dal';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import _l from '../constants/logger/CommonLogger';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { getNow } from '../utils/common/date.util';

import * as CryptoJS from 'crypto-js';
import { Cookie } from '../constants/response/cookie';

@Injectable()
export class AidocentService {
  private logger = new Logger(AidocentService.name);
  constructor(private chatGptService: ChatGptService, private chatHisDAL: ChatHisDAL, private projDAL: ProjDAL, private jwtService: JwtService) {}

  async createNewProject(body: ProjCreateDTO) {
    const preoject = await this.projDAL.create({
      status: 'ok',
      name: body.name,
      description: body.description,
      memo: body.memo,
      userPrompt: body.userPrompt,
    });

    const origin = `${preoject.projId}-${preoject.createDate}`;
    const restApiKey = CryptoJS.AES.encrypt(origin, process.env.CRYPTO_REST_API_KEY).toString();
    return new BasicResponse().status(200).message('').data({ restApiKey });
  }

  async startNewConversation(response: Response, projId: number) {
    // Encrypt
    const origin = `${projId}-${getNow('YYMMDD_HHmmssSSS')}`;
    const convoSessionId = CryptoJS.AES.encrypt(origin, process.env.CONVO_SESSION_KEY).toString();

    // Decrypt
    // const bytes = CryptoJS.AES.decrypt(convoSessionId, process.env.CONVO_SESSION_KEY);
    // const originalText = bytes.toString(CryptoJS.enc.Utf8);
    // this.logger.debug(originalText);

    // cookie setting
    Cookie.set(response, 'aidocent_convo_session_id', convoSessionId, {
      httpOnly: true,
      secure: false,
      domain: 'localhost',
    });

    return new BasicResponse().status(200).message('').data({
      convoSessionId,
    });
  }

  async askToAiWithProject(projId: number, convoSessionId: string, body: ChatAskToAiDTO, query: ChatAskToQueryDTO) {
    const proj = await this.projDAL.findOne(projId);

    // 유저가 설정한 프롬포트 가져오기
    const prompt = proj.userPrompt ? new ChatGptMessage('system', proj.userPrompt) : null;

    // 최신 유저 메시지 내용
    const userrMessage = new ChatGptMessage('user', body.question);

    // 기존 메시지 내역 가져오기
    const messages = (await this.chatHisDAL.findByConviSessionIdForGpt(convoSessionId, 10)).reverse();
    if (prompt) messages.unshift(prompt);
    messages.push(userrMessage);

    // 답변 길이 설정하기
    const lengthPrompt = this.chatGptService.createLengthPrompt(query.length);
    if (lengthPrompt) messages.push(new ChatGptMessage('system', lengthPrompt));

    // gpt에게 요청
    const { answer } = await this.chatGptService.createChat(messages);

    // 챗 히스토리 생성
    await this.chatHisDAL.bulkCreate([
      {
        projId: projId,
        convoSessionId: convoSessionId,
        type: '',
        status: '',
        speakerRole: userrMessage.role,
        content: userrMessage.content,
      },
      {
        projId: projId,
        convoSessionId: convoSessionId,
        type: '',
        status: '',
        speakerRole: answer.role,
        content: answer.content,
        resType: 'text',
        errorMsg: '',
      },
    ]);

    return new BasicResponse().status(200).message('').data({ answer });
  }

  async askToAiWithProjectByStreaming(res: Response, projId: number, convoSessionId: string, body: ChatAskToAiDTO, query: ChatAskToQueryDTO) {
    const proj = await this.projDAL.findOne(projId);
    const prompt = proj.userPrompt ? new ChatGptMessage('system', proj.userPrompt) : null;
    const userrMessage = new ChatGptMessage('user', body.question);
    // 기존 메시지 내역 가져오기
    const messages = (await this.chatHisDAL.findByConviSessionIdForGpt(convoSessionId, 10)).reverse();
    if (prompt) messages.unshift(prompt);
    messages.push(userrMessage);

    // 답변 길이 설정하기
    const lengthPrompt = this.chatGptService.createLengthPrompt(query.length);
    if (lengthPrompt) messages.push(new ChatGptMessage('system', lengthPrompt));

    await this.chatHisDAL.create({
      projId: projId,
      convoSessionId: convoSessionId,
      type: '',
      status: '',
      speakerRole: userrMessage.role,
      content: userrMessage.content,
    });

    // gpt에게 요청
    const answerStream = await this.chatGptService.createChatStream(messages);
    let answerContent = '';
    for await (const part of answerStream) {
      const content = part.choices[0]?.delta?.content || '';
      answerContent += content;
      res.write(content);
    }

    // 스트림 처리가 완료되면 응답 종료
    res.end(() => {
      // 챗 히스토리 생성
      this.chatHisDAL.create({
        projId: projId,
        convoSessionId: convoSessionId,
        type: '',
        status: '',
        speakerRole: 'assistant',
        content: answerContent,
        resType: 'text',
        errorMsg: '',
      });
    });
  }
}
