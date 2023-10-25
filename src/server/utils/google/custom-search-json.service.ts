import { Injectable } from '@nestjs/common';
import RestApi from '../common/restApi.util';
import { queryStringify } from '../common/text.util';
import { CSEquery } from './custom-search-json.type';

@Injectable()
export class CustomSearchJsonService {
  /**  */
  private readonly ApiKey = process.env.GOOGLE_CUSTOM_SEARCH_JSON_API_KEY;

  /** 검색엔진 아이디 */
  private readonly MainCX = process.env.GOOGLE_CUSTOM_SEARCH_JSON_CX;

  constructor() {}

  /**
   * @param query
   * @returns
   */
  async search(query: string, option?: CSEquery) {
    const queryString = queryStringify({
      key: this.ApiKey,
      cx: this.MainCX,
      q: query,
      ...option,
    });
    const response = await RestApi.request('GET', `https://www.googleapis.com/customsearch/v1?${queryString}`);
    return response;
  }
}
