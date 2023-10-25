import { Injectable, Logger } from '@nestjs/common';
import { ChatGptService } from '../utils/open-ai/chat-gpt.service';
import { BasicResponse } from '../constants/response/basicResponse';
import { ChatAskToAiByVoiceDTO, ChatAskToAiDTO } from './dto/chat-ask-to-ai.dto';
import ChatHisDAL from './dal/layers/chatHis.dal';
import { ProjCreateDTO } from './dto/proj-create.dto';
import ProjDAL from './dal/layers/proj.dal';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import _l from '../constants/logger/CommonLogger';
import { Response, response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { getNow } from '../utils/common/date.util';

import * as CryptoJS from 'crypto-js';

import { Cookie } from '../constants/response/cookie';
import { createUUID, isEmpty } from '../utils/common/text.util';
import { IProj } from './dal/dto/proj.dto';
import Codes from '../constants/codes';
import { ProjUpdateDTO } from './dto/proj-update.dto';
import { ClovaVoiceService } from '../utils/clova/clova-voice.service';
import { ChatGptMessage } from '../utils/open-ai/types/chat-message.type';
import { WhisperService } from '../utils/open-ai/whisper.service';
import { ClovaCSRService } from '../utils/clova/clova-csr.service';
import { EtriService } from '../utils/etri/etri.service';
import { CustomSearchJsonService } from '../utils/google/custom-search-json.service';

@Injectable()
export class AidocentService {
  private logger = new Logger(AidocentService.name);

  constructor(
    private chatGptService: ChatGptService,
    private whisperService: WhisperService,
    private clovaVoiceService: ClovaVoiceService,
    private etriService: EtriService,
    private clovaCSRService: ClovaCSRService,
    private chatHisDAL: ChatHisDAL,
    private projDAL: ProjDAL,
    private customSearchJsonService: CustomSearchJsonService,
  ) {}

  async searchTest() {
    const searchResult = await this.customSearchJsonService.search('작가 박봉수', {
      num: 3,
    });

    const search = searchResult.items;
    const prompt = `\`\`\`\n${JSON.stringify(search)}\n\`\`\`위 내용을 요약 정리해라`;
    const userrMessage = new ChatGptMessage('user', prompt);
    // gpt에게 요청
    const { answer } = await this.chatGptService.createChat([userrMessage]);
    return answer;
  }

  async getAllProject() {
    const project = await this.projDAL.findAll();
    return new BasicResponse().status(200).message('').data({ allCount: 0, project });
  }

  async createNewProject(body: ProjCreateDTO) {
    const project = await this.projDAL.create({
      status: Codes.ProjectStatus.VALID,
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

  async getOneProjectInfo(projId: number) {
    const result = await this.projDAL.findOne(projId);
    return new BasicResponse().status(200).message('').data(result);
  }

  async updateProjectInfo(projId: number, body: ProjUpdateDTO) {
    const result = await this.projDAL.update(projId, body);
    return new BasicResponse().status(200).message('').data(result);
  }

  async deleteOneProject(projId: number) {
    const result = await this.projDAL.update(projId, {
      status: Codes.ProjectStatus.DELETED,
    });
    return new BasicResponse().status(200).message('').data(result);
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

  async getAllConvoOfProject(projId: number) {
    const convos = await this.chatHisDAL.findAllConvoSessionIdOfProject(projId);
    return new BasicResponse().status(200).message('').data({ convos });
  }

  async getAllChatsOfConvoSession(convoSessionId: string) {
    const chats = await this.chatHisDAL.findByConviSessionId(convoSessionId, 0);
    return new BasicResponse().status(200).message('').data({ chats });
  }

  async getProjectInfoByRestApiKey(project) {
    return new BasicResponse().status(200).message('').data(project);
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

  async askToAiWithProject(project: IProj, body: ChatAskToAiDTO) {
    this.validateConvoSessionId(body.convoSessionId);
    const { userrMessage, messages } = await this.generateAiChatCompletionMessages(project, body);
    // gpt에게 요청
    const { answer } = await this.chatGptService.createChat(messages);
    // 챗 히스토리 생성
    await this.chatHisDAL.bulkCreate([
      {
        uuid: createUUID(),
        projId: project.projId,
        convoSessionId: body.convoSessionId,
        type: '',
        status: Codes.ChatHisStatus.VALID,
        speakerRole: userrMessage.role,
        content: userrMessage.content,
      },
      {
        uuid: createUUID(),
        projId: project.projId,
        convoSessionId: body.convoSessionId,
        type: '',
        status: Codes.ChatHisStatus.VALID,
        speakerRole: answer.role,
        content: answer.content,
        resType: Codes.ChatHisResType.TEXT,
        errorMsg: '',
      },
    ]);

    return new BasicResponse().status(200).message('').data({ question: userrMessage, answer });
  }

  async askToAiWithProjectByStreaming(res: Response, project: IProj, body: ChatAskToAiDTO) {
    // convoSessionId 유효성 검사
    this.validateConvoSessionId(body.convoSessionId);
    const { userrMessage, messages } = await this.generateAiChatCompletionMessages(project, body);

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
      _l.name('RES').log('end');
      this.chatHisDAL.bulkCreate([
        {
          uuid: createUUID(),
          projId: project.projId,
          convoSessionId: body.convoSessionId,
          type: '',
          status: Codes.ChatHisStatus.VALID,
          speakerRole: userrMessage.role,
          content: userrMessage.content,
        },
        {
          uuid: createUUID(),
          projId: project.projId,
          convoSessionId: body.convoSessionId,
          type: '',
          status: Codes.ChatHisStatus.VALID,
          speakerRole: 'assistant',
          content: answerContent,
          resType: Codes.ChatHisResType.TEXT,
          errorMsg: '',
        },
      ]);
    });
  }

  async askToAiWithProjectReturnTTS(response: Response, project: IProj, body: ChatAskToAiDTO) {
    this.validateConvoSessionId(body.convoSessionId);
    const { userrMessage, messages } = await this.generateAiChatCompletionMessages(project, body);
    // setting for tts
    messages.push(new ChatGptMessage('system', '2000자 이하로 tts로 변환하기 쉽도록 답변해.'));

    // gpt에게 요청
    const { answer } = await this.chatGptService.createChat(messages);
    // 음성 파일로 전달해야함
    const ttsRes = await this.clovaVoiceService.makeTTS(answer.content);
    response.set({
      'content-type': ttsRes.headers['content-type'],
      'aidocent-answer-text': encodeURI(answer.content),
      'aidocent-question-text': encodeURI(userrMessage.content),
    });
    ttsRes.data.pipe(response); // response를 보냄

    await this.chatHisDAL.bulkCreate([
      {
        projId: project.projId,
        uuid: createUUID(),
        convoSessionId: body.convoSessionId,
        type: '',
        status: Codes.ChatHisStatus.VALID,
        speakerRole: userrMessage.role,
        content: userrMessage.content,
      },
      {
        projId: project.projId,
        uuid: createUUID(),
        convoSessionId: body.convoSessionId,
        type: '',
        status: Codes.ChatHisStatus.VALID,
        speakerRole: answer.role,
        content: answer.content,
        resType: Codes.ChatHisResType.VOICE,
        errorMsg: '',
      },
    ]);
  }

  async askToAiWithProjectByVoice(response: Response, project: IProj, body: ChatAskToAiByVoiceDTO, questionVoiceFile: Express.Multer.File) {
    const questionText = await this.whisperService.transcriptions(questionVoiceFile);
    // const questionText = await this.clovaCSRService.stt(questionVoiceFile);
    this.logger.debug('questionText: ', questionText);

    const questionBody = {
      convoSessionId: body.convoSessionId,
      length: body.length,
      question: questionText,
    };

    switch (body?.resType) {
      case 'text-stream':
        await this.askToAiWithProjectByStreaming(response, project, questionBody);
        break;
      case 'tts':
        await this.askToAiWithProjectReturnTTS(response, project, questionBody);
        break;
      default:
        // text
        return await this.askToAiWithProject(project, questionBody);
    }
  }

  async generateAiChatCompletionMessages(project: IProj, body: ChatAskToAiDTO) {
    // 유저가 설정한 프롬포트 가져오기
    const prompt = project.userPrompt ? new ChatGptMessage('system', project.userPrompt) : null;
    // 최신 유저 메시지 내용
    const userrMessage = new ChatGptMessage('user', body.question);

    // 기존 메시지 내역 가져오기
    const messages = (await this.chatHisDAL.findByConviSessionIdForGpt(project.projId, body.convoSessionId, 10)).reverse();
    if (prompt) messages.unshift(prompt);
    messages.push(userrMessage);

    // 답변 길이 설정하기
    const lengthPrompt = this.createLengthPrompt(body.length);
    if (lengthPrompt) messages.push(new ChatGptMessage('system', lengthPrompt));
    return { userrMessage, messages };
  }

  createLengthPrompt(length?: string | 'short' | 'long') {
    switch (length) {
      case 'short':
        return '20초 이하의 분량으로 답해.';
      case 'long':
        return '5줄 이상의 분량으로 답해.';
      default:
        return '';
    }
  }
}
