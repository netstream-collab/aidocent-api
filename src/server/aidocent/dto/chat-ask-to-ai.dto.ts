import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
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
    title: '답변길이',
    description: 'ai가 답변할 리턴 타입',
    example: 'text',
    enum: ['text', 'text-stream', 'tts'],
  })
  @IsString()
  @IsOptional()
  readonly resType?: string;
}

export class ChatAskToAiByVoiceDTO extends OmitType(ChatAskToAiDTO, ['question']) {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  questionVoice: Express.Multer.File;
}
