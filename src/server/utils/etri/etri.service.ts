import { Injectable } from '@nestjs/common';
import RestApi from '../common/restApi.util';

type TEtriSTTLanguageCode =
  | 'korean'
  | 'english'
  | 'japanese'
  | 'chinese'
  | 'spanish'
  | 'french'
  | 'german'
  | 'russian'
  | 'vietnam'
  | 'arabic'
  | 'thailand'
  | 'portuguese';

type TEtriSTTResponse = {
  request_id: string;
  result: number | string;
  return_object?: { recognized: string };
  reason?: string | any;
};

@Injectable()
export class EtriService {
  constructor() {}

  private readonly API_KEY = process.env.ETRI_API_KEY;

  async stt(fileBuffer: Buffer, languageCode?: TEtriSTTLanguageCode): Promise<TEtriSTTResponse> {
    const response = await RestApi.request(
      'POST',
      'http://aiopen.etri.re.kr:8000/WiseASR/Recognition',
      {
        argument: {
          language_code: languageCode || 'korean',
          audio: fileBuffer.toString('base64'),
        },
      },
      {
        Authorization: this.API_KEY,
      },
    );

    return response;
  }
}
