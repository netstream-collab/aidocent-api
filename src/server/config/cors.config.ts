import * as dotenv from 'dotenv';
dotenv.config();

import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as CorsConfigJson from './cors.config.json';

export class CorsConfig {
  static nodeEnv = process.env.NODE_ENV;

  static config = CorsConfigJson[CorsConfig.nodeEnv] || CorsConfigJson.dev;

  static origin = CorsConfig.config.cors_origins;

  static option: CorsOptions = {
    origin: CorsConfig.origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204,
    exposedHeaders: ['Authorization', 'access_token', 'refresh_token', 'super_token', 'aidocent-answer-text'],
    allowedHeaders: ['Content-Type', 'Authorization', 'authorization', 'access_token', 'refresh_token', 'super_token', 'aidocent-rest-api-key'],
  };
}
