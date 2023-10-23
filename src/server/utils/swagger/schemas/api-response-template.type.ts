import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseTemplate {
  @ApiProperty({ title: 'http statua code', example: 200 })
  status: number;

  @ApiProperty({ title: '결과 코드값', example: '00' })
  resultCode: string;

  @ApiProperty({ title: '결과 메시지', example: 'Success to create project' })
  message: string;

  @ApiProperty({ title: '결과 데이터', example: {} })
  data: any;
}
