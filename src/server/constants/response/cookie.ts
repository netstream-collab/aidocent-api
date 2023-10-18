import { CookieOptions, Response } from 'express';

import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
dotenv.config();

export class Cookie {
  private static logger = new Logger('Cookie');

  constructor() {}

  static set(response: Response, key: string, value: string, option?: CookieOptions) {
    this.logger.debug(`set ${key} : ${value} `, option);
    response.cookie(key, value, option);
  }

  static bulkSet(response: Response, key: string, value: string, domains: string[], option?: Omit<CookieOptions, 'domain'>) {
    domains.map((domain: string) => {
      if (domain) {
        this.set(response, key, value, {
          ...option,
          domain,
        });
      }
    });
  }
}
