import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Res,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiHeader, ApiHeaders, ApiOperation, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { AidocentService } from './aidocent.service';
import { ChatAskToAiByVoiceDTO, ChatAskToAiDTO } from './dto/chat-ask-to-ai.dto';
import { ProjCreateDTO } from './dto/proj-create.dto';
import { RequestIP } from '../utils/network/requestIp.decorator';
import { RestApiKeyGuard } from './auth/guard/restApiKey.guard';
import { Project } from './auth/decorator/projcet.decorator';
import { ProjUpdateDTO } from './dto/proj-update.dto';
import {
  ApiDeleteProjInfo,
  ApiGetProjAllRes,
  ApiGetProjConvoChat,
  ApiGetProjConvoList,
  ApiGetProjInfo,
  ApiPatchProjInfo,
  ApiPostAidChatAskText,
  ApiPostAidChatNewConvo,
  ApiPostProjNewRes,
  ApiPostProjRenewRestApiKey,
} from '../utils/swagger/schemas/api-response.type';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { SearchTagsSummaryDTO } from './dto/search-tags-summary.dto';

@ApiTags('AI docent')
@Controller('')
export class AidocentController {
  constructor(readonly aidocentService: AidocentService) {}

  /** --- Project --------------------------------------------- */

  @ApiOperation({ summary: '정보 검색' })
  @Get('/search/test')
  searchTest() {
    return this.aidocentService.searchTest();
  }

  /** --- Project --------------------------------------------- */

  @ApiOperation({ summary: '모든 프로젝트 정보 가져오기' })
  @ApiResponse({ status: 200, type: ApiGetProjAllRes })
  @Get('/proj/all')
  getAllProject() {
    return this.aidocentService.getAllProject();
  }

  @ApiOperation({ summary: '신규 프로젝트 생성' })
  @ApiResponse({ status: 200, description: '정상 작동 완료', type: ApiPostProjNewRes })
  @Post('/proj/new')
  @HttpCode(200)
  createNewProject(@Body() body: ProjCreateDTO) {
    return this.aidocentService.createNewProject(body);
  }

  @ApiOperation({ summary: '특정 프로젝트 정보 가져오기' })
  @ApiResponse({ status: 200, description: '정상 작동 완료', type: ApiGetProjInfo })
  @Get('/proj/:projId/info')
  getOneProjectInfo(@Param('projId') projId: number) {
    return this.aidocentService.getOneProjectInfo(projId);
  }

  @ApiOperation({ summary: '특정 프로젝트의 정보 수정하기' })
  @ApiResponse({ status: 200, description: '정상 작동 완료', type: ApiPatchProjInfo })
  @Patch('/proj/:projId/info')
  updateProjectInfo(@Param('projId') projId: number, @Body() body: ProjUpdateDTO) {
    return this.aidocentService.updateProjectInfo(projId, body);
  }

  @ApiOperation({ summary: '특정 프로젝트 삭제하기' })
  @ApiResponse({ status: 200, description: '정상 작동 완료', type: ApiDeleteProjInfo })
  @Post('/proj/:projId/del')
  deleteOneProject(@Param('projId') projId: number) {
    return this.aidocentService.deleteOneProject(projId);
  }

  @ApiOperation({ summary: '특정 프로젝트의 rest-api-key 갱신하기' })
  @ApiResponse({ status: 200, description: '정상 작동 완료', type: ApiPostProjRenewRestApiKey })
  @Post('/proj/:projId/renew/rest-api-key')
  renewRestApiKeyOfProject(@Param('projId') projId: number) {
    return this.aidocentService.renewRestApiKeyOfProject(projId);
  }

  @ApiOperation({ summary: '특정 프로젝트의 대화 내역 리스트 가져오기' })
  @ApiResponse({ status: 200, description: '정상 작동 완료', type: ApiGetProjConvoList })
  @Get('/proj/:projId/convo')
  getAllConvoOfProject(@Param('projId') projId: number) {
    return this.aidocentService.getAllConvoOfProject(projId);
  }

  @ApiOperation({ summary: 'convo session에 속한 모든 챗 정보 가져오기' })
  @ApiResponse({ status: 200, description: '정상 작동 완료', type: ApiGetProjConvoChat })
  @Get('/proj/convo/chat/:convoSessionId')
  getAllChatsOfConvoSession(@Param('convoSessionId') convoSessionId: string) {
    return this.aidocentService.getAllChatsOfConvoSession(convoSessionId);
  }

  /** --- AIdocnet Rest Api --------------------------------------------- */

  @ApiBearerAuth('aidocent-rest-api-key')
  @ApiOperation({ summary: '태그 기반 정보 검색후 요약' })
  @Post('/search/tags/summary')
  searchTagsSummary(@Response({ passthrough: true }) response, @Body() body: SearchTagsSummaryDTO) {
    return this.aidocentService.searchTagsSummary(response, body);
  }

  @ApiBearerAuth('aidocent-rest-api-key')
  @ApiOperation({ summary: 'rest api key를 통해 프로젝트 정보 가져오기', description: '' })
  @ApiResponse({ status: 200, type: ApiGetProjAllRes })
  @Get('/aid/proj/info')
  @UseGuards(RestApiKeyGuard)
  async getProjectInfoByRestApiKey(@Project() project) {
    return this.aidocentService.getProjectInfoByRestApiKey(project);
  }

  @ApiBearerAuth('aidocent-rest-api-key')
  @ApiOperation({ summary: '신규 대화 세션값 생성하기' })
  @ApiResponse({ status: 200, description: '정상 작동 완료', type: ApiPostAidChatNewConvo })
  @Post('/aid/chat/new/convo')
  @HttpCode(200)
  @UseGuards(RestApiKeyGuard)
  startNewConversation(@Res({ passthrough: true }) response, @Project('projId') projId: number) {
    return this.aidocentService.startNewConversation(response, projId);
  }

  @ApiBearerAuth('aidocent-rest-api-key')
  @ApiOperation({ summary: '프로젝트 기반으로 ai에게 질문하기 / 리턴타입: 텍스트' })
  @ApiResponse({ status: 200, description: '정상 작동 완료', type: ApiPostAidChatAskText })
  @HttpCode(200)
  @Post('/aid/chat/ask')
  @UseGuards(RestApiKeyGuard)
  askToAiWithProject(@Res({ passthrough: true }) res, @Body() body: ChatAskToAiDTO, @Project() project) {
    return this.aidocentService.askToAiWithProject(project, body);
  }

  @ApiBearerAuth('aidocent-rest-api-key')
  @ApiOperation({ summary: '프로젝트 기반으로 ai에게 질문하기  / 리턴타입: 텍스트 스트림' })
  @ApiResponse({ status: 200, description: '정상 작동 완료' })
  @HttpCode(200)
  @Post('/aid/chat/ask/stream')
  @UseGuards(RestApiKeyGuard)
  askToAiWithProjectByStreaming(@Res({ passthrough: true }) res, @Body() body: ChatAskToAiDTO, @Project() project) {
    return this.aidocentService.askToAiWithProjectByStreaming(res, project, body);
  }

  @ApiBearerAuth('aidocent-rest-api-key')
  @ApiOperation({ summary: '프로젝트 기반으로 ai에게 질문하기  / 리턴타입: tts 보이스 스트림' })
  @ApiResponse({
    status: 200,
    description: '정상 작동 완료',
    headers: {
      'aidocent-answer-text': {
        description: 'ai 답변 문자열',
        example: '안녕! 어떻게 지내?',
      },
    },
  })
  @HttpCode(200)
  @Post('/aid/chat/ask/tts')
  @UseGuards(RestApiKeyGuard)
  askToAiWithProjectReturnTTS(@Res() res, @Body() body: ChatAskToAiDTO, @Project() project) {
    // { passthrough: true } 제거해야 mp3 stream이 끊기지 않고 전달된다.
    return this.aidocentService.askToAiWithProjectReturnTTS(res, project, body);
  }

  @ApiBearerAuth('aidocent-rest-api-key')
  @ApiOperation({ summary: '음성파일로 질문하기' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: '정상',
    headers: {
      'aidocent-question-text': {
        description: '질문으로 인식된 문자열',
      },
      'aidocent-answer-text': {
        description: 'ai 답변 문자열',
      },
    },
  })
  @HttpCode(200)
  @Post('/aid/chat/ask/voice')
  @UseGuards(RestApiKeyGuard)
  @UseInterceptors(FileInterceptor('questionVoice'))
  askToAiWithProjectByVoice(
    @Res({ passthrough: true }) res,
    @Body() body: ChatAskToAiByVoiceDTO,
    @Project() project,
    @UploadedFile() questionVoiceFile: Express.Multer.File,
  ) {
    return this.aidocentService.askToAiWithProjectByVoice(res, project, body, questionVoiceFile);
  }
}
