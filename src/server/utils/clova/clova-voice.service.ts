import { Injectable } from '@nestjs/common';
import RestApi from '../common/restApi.util';

@Injectable()
export class ClovaVoiceService {
  constructor() {}

  private readonly RequestUrl = 'https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts';
  private readonly ClientId = 'b3rk1949a6';
  private readonly ClientSecret = 'r93bceoK7Tr51ezSIcy1wjdvCuTktVXsQSX65yFo';

  async makeTTS(text: string) {
    const requestData = {
      speaker: 'nara', // 음성 합성에 사용할 목소리 종류
      // speaker: 'dara-danna', // 음성 합성에 사용할 목소리 종류
      text: text.replace(/\n/g, ''), // 음성 합성할 문장 - 최대 2,000자까지 음성 합성
      volume: 0, //
      speed: 0,
      format: 'mp3',
    };
    const response = await RestApi.requestStream(
      'post',
      this.RequestUrl,
      this.queryStringify(requestData),
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-NCP-APIGW-API-KEY-ID': this.ClientId, // 애플리케이션 등록 시 발급받은 client id값
        'X-NCP-APIGW-API-KEY': this.ClientSecret, //
      },
      true,
    );
    // MP3 또는 WAV 바이너리 데이터
    return response;
  }

  /**
   * 오브제그를 쿼리스트링로 바꾼다
   * @param obj
   * @returns
   */
  queryStringify(obj: any): string {
    if (!obj) return '';
    let qs = '';
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      qs += `${key}=${encodeURIComponent(obj[key] + '' || '')}&`;
    });
    qs = qs.replace(/&$/, '');
    console.log('QueryStringify qa: ', qs);
    return qs;
  }
}
