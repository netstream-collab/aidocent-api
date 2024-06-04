import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from "class-validator";
import Codes from 'src/server/constants/codes';

export class ChatAskToAiDTO {
  @ApiProperty({ title: '대화 세션 아이디', description: '', example: '' })
  @IsString()
  readonly convoSessionId: string;

  @ApiProperty({ title: '질문 내용', description: 'ai에게 질문할 내용', example: '안녕?' })
  @IsString()
  readonly question: string;

  @ApiPropertyOptional({
    title: '답변길이',
    description: 'ai가 답변할 내용의 길이',
    example: 'long',
    enum: ['long', 'short', 'default'],
  })
  @IsString()
  @IsOptional()
  readonly length?: string;

  @ApiPropertyOptional({
    title: '리턴 답변 타입',
    description: 'ai가 답변할 리턴 타입',
    example: 'text',
    enum: ['text', 'text-stream', 'tts'],
  })
  @IsString()
  @IsOptional()
  readonly resType?: string;

  @ApiPropertyOptional({
    title: 'LLM 모델 타입',
    description: 'AI로 사용할 LLM 종류',
    example: Codes.LLMModels[0],
    enum: Codes.LLMModels,
    default: Codes.LLMModels[0],
  })
  @IsString()
  @IsOptional()
  readonly model?: string;

  @ApiPropertyOptional({
    title: '이전 대화 조회 개수',
    description: '이전 대회 조회 목록 개수',
    default: 4,
  })
  @IsOptional()
  @IsNumber()
  readonly limit?: number = 4;

  @ApiPropertyOptional({
    title: '기억의존 여부',
    description: '0: 사용 안함, 1: 기억의존 사용',
    default: 0,
    enum: [0, 1],
  })
  @IsOptional()
  @IsNumber()
  readonly isRemind?: number = 0;
}

export class ChatAskToAiByVoiceDTO extends OmitType(ChatAskToAiDTO, ['question']) {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  questionVoice: Express.Multer.File;
}
