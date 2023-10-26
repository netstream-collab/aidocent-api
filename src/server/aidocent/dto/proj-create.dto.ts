import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class ProjCreateDTO {
  @ApiProperty({ title: '프로젝트 이름', example: '신규 프로젝트' })
  @IsString()
  readonly name: string;

  @ApiProperty({ title: '프로젝트 코드', description: '영어,숫자,기호만 가능', example: 'sample' })
  @IsString()
  @Matches(/^[A-Za-z0-9-_]+$/g)
  readonly code: string;

  @ApiPropertyOptional({ title: '프로젝트 설명', example: '신규 아이템 전시 프로젝트' })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiPropertyOptional({ title: '사용자 프롬포트', example: '친구에게 말하듯이 친근하게 대답해.' })
  @IsString()
  @IsOptional()
  readonly userPrompt: string;

  @ApiPropertyOptional({ title: '메모', example: '' })
  @IsString()
  @IsOptional()
  readonly memo: string;

  @ApiPropertyOptional({ title: '프로젝트 태그', description: '쉼표로 구분하는 키워드 문자열', example: '넷스트림,상현태,chatRPG' })
  @IsString()
  @IsOptional()
  readonly tags: string;
}
