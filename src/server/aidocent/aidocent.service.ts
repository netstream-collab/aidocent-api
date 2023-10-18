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
import { isEmpty } from '../utils/common/text.util';
import { IProj } from './dal/dto/proj.dto';

@Injectable()
export class AidocentService {
  private logger = new Logger(AidocentService.name);
  constructor(private chatGptService: ChatGptService, private chatHisDAL: ChatHisDAL, private projDAL: ProjDAL, private jwtService: JwtService) {}

  async createNewProject(body: ProjCreateDTO) {
    const project = await this.projDAL.create({
      status: 'ok',
      projCode: body.code,
      name: body.name,
      description: body.description,
      memo: body.memo,
      userPrompt: body.userPrompt,
    });

    const restApiKey = project.uuid.slice(0, 2) + '-' + project.projCode;
    await this.projDAL.updateRestApiKey(project.projId, restApiKey);

    return new BasicResponse()
      .status(200)
      .message('')
      .data({
        ...project,
        restApiKey,
      });
  }

  /**
   * @param projId
   * @returns
   */
  async renewRestApiKeyOfProject(projId: number) {
    // project 유효성 확인
    const project = await this.projDAL.validate(projId);
    const restApiKey = project.uuid.slice(0, 2) + '-' + project.projCode;
    await this.projDAL.updateRestApiKey(projId, restApiKey);
    return new BasicResponse().status(200).message('').data({ restApiKey: restApiKey });
  }

  async getAllChatsOfConvoSession(convoSessionId: string) {
    const chats = await this.chatHisDAL.findByConviSessionId(convoSessionId);
    return new BasicResponse().status(200).message('').data({ chats });
  }

  async startNewConversation(response: Response, projId: number) {
    // Encrypt
    const origin = `${projId}-${getNow('YYMMDD_HHmmssSSS')}`;
    const convoSessionId = CryptoJS.RC4.encrypt(origin, process.env.CONVO_SESSION_KEY).toString();

    // Decrypt
    // const bytes = CryptoJS.RC4.decrypt(convoSessionId, process.env.CONVO_SESSION_KEY);
    // const originalText = bytes.toString(CryptoJS.enc.Utf8);
    // this.logger.debug(originalText);

    // cookie setting
    Cookie.set(response, 'aidocent-convo-session-id', convoSessionId, {
      httpOnly: true,
      secure: false,
    });

    return new BasicResponse().status(200).message('').data({
      convoSessionId,
    });
  }

  validateConvoSessionId(convoSessionId: string) {
    if (isEmpty(convoSessionId)) {
      throw Error('none convo session id.');
    }
    return true;
  }

  async askToAiWithProject(project: IProj, body: ChatAskToAiDTO, query: ChatAskToQueryDTO) {
    this.validateConvoSessionId(body.convoSessionId);
    // 유저가 설정한 프롬포트 가져오기
    const prompt = project.userPrompt ? new ChatGptMessage('system', project.userPrompt) : null;

    // 최신 유저 메시지 내용
    const userrMessage = new ChatGptMessage('user', body.question);

    // 기존 메시지 내역 가져오기
    const messages = (await this.chatHisDAL.findByConviSessionIdForGpt(project.projId, body.convoSessionId, 10)).reverse();
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
        projId: project.projId,
        convoSessionId: body.convoSessionId,
        type: '',
        status: '',
        speakerRole: userrMessage.role,
        content: userrMessage.content,
      },
      {
        projId: project.projId,
        convoSessionId: body.convoSessionId,
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

  async askToAiWithProjectByStreaming(res: Response, project: IProj, body: ChatAskToAiDTO, query: ChatAskToQueryDTO) {
    this.validateConvoSessionId(body.convoSessionId);

    const prompt = project.userPrompt ? new ChatGptMessage('system', project.userPrompt) : null;
    const userrMessage = new ChatGptMessage('user', body.question);
    // 기존 메시지 내역 가져오기
    const messages = (await this.chatHisDAL.findByConviSessionIdForGpt(project.projId, body.convoSessionId, 10)).reverse();
    if (prompt) messages.unshift(prompt);
    messages.push(userrMessage);

    // 답변 길이 설정하기
    const lengthPrompt = this.chatGptService.createLengthPrompt(query.length);
    if (lengthPrompt) messages.push(new ChatGptMessage('system', lengthPrompt));

    await this.chatHisDAL.create({
      projId: project.projId,
      convoSessionId: body.convoSessionId,
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
        projId: project.projId,
        convoSessionId: body.convoSessionId,
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
