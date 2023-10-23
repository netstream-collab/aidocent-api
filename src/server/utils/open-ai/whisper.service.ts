import { Injectable, Logger } from '@nestjs/common';
import RestApi from '../common/restApi.util';

import * as FormData from 'form-data';

@Injectable()
export class WhisperService {
  private logger = new Logger('Whisper');
  private readonly REST_KEY = process.env.OPENAI_API_KEY;

  private readonly model = 'whisper-1';

  constructor() {}

  async transcriptions(file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', file.buffer, 'question.mp3');
    formData.append('model', this.model);

    const response = await RestApi.request('POST', 'https://api.openai.com/v1/audio/transcriptions', formData, {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${this.REST_KEY}`,
    });
    this.logger.debug('response:', response);
    return response.text;
  }
}
