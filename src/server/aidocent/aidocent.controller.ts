import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AidocentService } from './aidocent.service';
import { ChatAskToAiDTO, ChatAskToQueryDTO } from './dto/chat-ask-to-ai.dto';
import { ProjCreateDTO } from './dto/proj-create.dto';
import { RequestIP } from '../utils/network/requestIp.decorator';
import { Response } from 'express';
import { RestApiKeyGuard } from './auth/guard/restApiKey.guard';
import { Project } from './auth/decorator/projcet.decorator';

@ApiTags('AI docent')
@Controller('')
export class AidocentController {
  constructor(readonly aidocentService: AidocentService) {}

  /** --- Project --------------------------------------------- */
  @ApiOperation({ summary: '특정 프로젝트 정보 가져오기' })
  @Get('/proj/info/:projId')
  getOneProjectInfo(@Param('projId') projId: number) {}

  @ApiOperation({ summary: '특정 프로젝트 삭제하기' })
  @Delete('/proj/del/:projId')
  deleteOneProject() {}

  @ApiOperation({ summary: '신규 프로젝트 생성' })
  @ApiResponse({ status: 200, description: '정상 작동 완료' })
  @Post('/proj/new')
  @HttpCode(200)
  createNewProject(@Body() body: ProjCreateDTO) {
    return this.aidocentService.createNewProject(body);
  }

  @ApiOperation({ summary: '특정 프로젝트의 rest-api-key 갱신하기' })
  @Post('/proj/renew/:projId/rest-api-key')
  renewRestApiKeyOfProject(@Param('projId') projId: number) {
    return this.aidocentService.renewRestApiKeyOfProject(projId);
  }

  @ApiOperation({ summary: '특정 프로젝트의 정보 수정하기' })
  @Patch('/proj/info/:projId')
  updateProjectInfo() {}

  @ApiOperation({ summary: '특정 프로젝트의 정보 수정하기' })
  @Get('/proj/convo/:projId')
  getAllConvoOfProject(@Param('projId') projId: number) {}

  @ApiOperation({ summary: 'convo session에 속한 모든 챗 정보 가져오기' })
  @Get('/proj/convo/chat/:convoSessionId')
  getAllChatsOfConvoSession(@Param('convoSessionId') convoSessionId: string) {
    return this.aidocentService.getAllChatsOfConvoSession(convoSessionId);
  }

  /** --- AIdocnet Rest Api --------------------------------------------- */

  @ApiBearerAuth('aidocent-rest-api-key')
  @ApiOperation({ summary: 'rest api key를 통해 프로젝트 정보 가져오기', description: '' })
  @Get('/aid/proj/info')
  @UseGuards(RestApiKeyGuard)
  async getProjectInfoByRestApiKey(@Project() project) {
    return project;
  }

  @ApiBearerAuth('aidocent-rest-api-key')
  @ApiOperation({ summary: '프로젝트 기반으로 ai에게 질문하기' })
  @ApiResponse({ status: 200, description: '정상 작동 완료' })
  @Post('/aid/chat/new/convo')
  @HttpCode(200)
  @UseGuards(RestApiKeyGuard)
  startNewConversation(@Res({ passthrough: true }) response: Response, @Project('projId') projId: number) {
    return this.aidocentService.startNewConversation(response, projId);
  }

  @ApiBearerAuth('aidocent-rest-api-key')
  @ApiOperation({ summary: '프로젝트 기반으로 ai에게 질문하기' })
  @ApiResponse({ status: 200, description: '정상 작동 완료' })
  @HttpCode(200)
  @Post('/aid/chat/ask')
  @UseGuards(RestApiKeyGuard)
  askToAiWithProject(@Query() query: ChatAskToQueryDTO, @Body() body: ChatAskToAiDTO, @Project() project) {
    return this.aidocentService.askToAiWithProject(project, body, query);
  }

  @ApiBearerAuth('aidocent-rest-api-key')
  @ApiOperation({ summary: '프로젝트 기반으로 ai에게 질문하기' })
  @ApiResponse({ status: 200, description: '정상 작동 완료' })
  @HttpCode(200)
  @Post('/aid/chat/ask/stream')
  @UseGuards(RestApiKeyGuard)
  askToAiWithProjectByStreaming(
    @Res({ passthrough: true }) res,
    @Query() query: ChatAskToQueryDTO,
    @Body() body: ChatAskToAiDTO,
    @Project() project,
  ) {
    return this.aidocentService.askToAiWithProjectByStreaming(res, project, body, query);
  }
}
