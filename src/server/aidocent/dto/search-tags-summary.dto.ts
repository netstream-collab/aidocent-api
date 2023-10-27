import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Matches, IsOptional, IsArray } from 'class-validator';

export class SearchTagsSummaryDTO {
  @ApiProperty({ title: '프로젝트 이름', example: ['netstream', '넷스트림', '어바운드리', '성수팝업'] })
  @IsArray()
  readonly tags: Array<string>;

  @ApiPropertyOptional({
    title: '답변 타입',
    description: 'ai가 답변할 리턴 타입',
    example: 'text',
    enum: ['text', 'text-stream', 'tts'],
  })
  @IsString()
  @IsOptional()
  readonly resType?: string;
}
