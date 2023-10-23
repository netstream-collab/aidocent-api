import { Injectable } from '@nestjs/common';
import RestApi from '../common/restApi.util';

/**
 * 15초당 / 4 원
 * @link https://www.ncloud.com/product/aiService/csr\2
 * @link https://api.ncloud-docs.com/docs/ai-naver-clovaspeechrecognition
 */
@Injectable()
export class ClovaCSRService {
  private readonly RequestUrl = 'https://naveropenapi.apigw.ntruss.com/recog/v1/stt';
  private readonly ClientId = 'b3rk1949a6';
  private readonly ClientSecret = 'r93bceoK7Tr51ezSIcy1wjdvCuTktVXsQSX65yFo';

  constructor() {}

  async stt(file: Express.Multer.File) {
    const requestBody = {
      image: file.buffer,
    };

    const response = await RestApi.request('POST', `${this.RequestUrl}?lang=Kor`, file.buffer, {
      'Content-Type': 'application/octet-stream',
      'X-NCP-APIGW-API-KEY-ID': this.ClientId,
      'X-NCP-APIGW-API-KEY': this.ClientSecret,
    });

    return response.text;
  }
}
