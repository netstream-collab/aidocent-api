import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ChatAskToAiDTO {
  @ApiProperty({ title: '질문 내용', description: 'ai에게 질문할 내용', example: '안녕?' })
  @IsString()
  readonly question: string;
}

export class ChatAskToQueryDTO {
  @ApiPropertyOptional({
    title: '답변길이',
    description: 'ai가 답변할 내용의 길이',
    example: 'long',
    enum: ['long', 'short', 'default'],
  })
  @IsString()
  @IsOptional()
  readonly length?: string;
}
