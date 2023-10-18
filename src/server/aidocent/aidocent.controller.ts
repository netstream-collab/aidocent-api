import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AidocentService } from './aidocent.service';
import { ChatAskToAiDTO, ChatAskToQueryDTO } from './dto/chat-ask-to-ai.dto';
import { ProjCreateDTO } from './dto/proj-create.dto';
import { RequestIP } from '../utils/network/requestIp.decorator';
import { Response } from 'express';

@ApiTags('AI docent')
@Controller('')
export class AidocentController {
  constructor(readonly aidocentService: AidocentService) {}

  /** --- Project --------------------------------------------- */
  @ApiOperation({ description: '특정 프로젝트 정보 가져오기' })
  @Get('/proj/:projId')
  getOneProjectInfo() {}

  @ApiOperation({ description: '특정 프로젝트 삭제하기' })
  @Delete('/proj/:projId')
  deleteOneProject() {}

  @ApiOperation({ description: '신규 프로젝트 생성' })
  @ApiResponse({ status: 200, description: '정상 작동 완료' })
  @Post('/proj/new')
  @HttpCode(200)
  createNewProject(@Body() body: ProjCreateDTO) {
    return this.aidocentService.createNewProject(body);
  }

  @ApiOperation({ description: '특정 프로젝트의 rest-api-key 갱신하기' })
  @Post('/proj/renew/:projId/rest-api-key')
  renewRestApiKeyOfProject() {}

  @ApiOperation({ description: '특정 프로젝트의 정보 수정하기' })
  @Patch('/proj/info/:projId')
  updateProjectInfo() {}

  /** --- AIdocnet --------------------------------------------- */

  @ApiOperation({ description: '프로젝트 기반으로 ai에게 질문하기' })
  @ApiResponse({ status: 200, description: '정상 작동 완료' })
  @Post('/chat/new/convo')
  @HttpCode(200)
  startNewConversation(@Res({ passthrough: true }) response: Response) {
    const projId = 1;
    return this.aidocentService.startNewConversation(response, projId);
  }

  @ApiOperation({ description: '프로젝트 기반으로 ai에게 질문하기' })
  @ApiResponse({ status: 200, description: '정상 작동 완료' })
  @HttpCode(200)
  @Post('/chat/ask')
  askToAiWithProject(@Query() query: ChatAskToQueryDTO, @Body() body: ChatAskToAiDTO) {
    const projId = 1;
    const convoSessionId = '';
    return this.aidocentService.askToAiWithProject(projId, convoSessionId, body, query);
  }

  @ApiOperation({ description: '프로젝트 기반으로 ai에게 질문하기' })
  @ApiResponse({ status: 200, description: '정상 작동 완료' })
  @HttpCode(200)
  @Post('/chat/ask/stream')
  askToAiWithProjectByStreaming(@Res({ passthrough: true }) res, @Query() query: ChatAskToQueryDTO, @Body() body: ChatAskToAiDTO) {
    const projId = 1;
    const convoSessionId = '';
    return this.aidocentService.askToAiWithProjectByStreaming(res, projId, convoSessionId, body, query);
  }
}
