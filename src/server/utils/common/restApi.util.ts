import axios from 'axios';
import _l from 'src/server/constants/logger/CommonLogger';
import { isEmpty } from './text.util';
type TMethod = 'get' | 'post' | 'fetch' | 'delete' | 'GET' | 'POST' | 'FETCH' | 'DELETE';

axios.defaults.withCredentials = true;

export default class RestApi {
  static async request(method: TMethod, url: string, body?: any, headers?: any, getRawRes?: boolean) {
    function logResponse() {
      const { status, statusText, headers, data } = response;
      const resLog = { status, statusText, headers, data };
      // console.log('RestApi RESPONSE:', response);
      console.log('RestApi RESPONSE:', resLog);
      console.log('RestApi RESPONSE URL:', response.request.res.responseUrl);
      // console.log('RestApi RESPONSE:', response.request.res.headers);
    }
    function logRequest() {
      console.log(`RestApi REQUEST: ${method} ${url}`);
      // console.log(`RestApi REQUEST BODY: ${body ? JSON.stringify(body) : ''}`);
    }

    if (isEmpty(url)) {
      throw new Error('RestApi: Please enter url (include host url).');
    }

    logRequest();
    const response = await axios({
      method: method,
      url: url,
      data: body,
      headers,
    });

    logResponse();
    if (getRawRes) {
      return response;
    } else {
      return response.data;
    }
  }

  static async requestStream(method: TMethod, url: string, body?: any, headers?: any, getRawRes?: boolean) {
    function logResponse() {
      const { status, statusText, headers, data } = response;
      const resLog = { status, statusText, headers, data };
      // console.log('RestApi RESPONSE:', response);
      console.log('RestApi RESPONSE:', resLog);
      console.log('RestApi RESPONSE URL:', response.request.res.responseUrl);
      // console.log('RestApi RESPONSE:', response.request.res.headers);
    }
    function logRequest() {
      console.log(`RestApi REQUEST: ${method} ${url}`);
      console.log(`RestApi REQUEST BODY: ${body ? JSON.stringify(body) : ''}`);
    }

    if (isEmpty(url)) {
      throw new Error('RestApi: Please enter url (include host url).');
    }

    logRequest();
    const response = await axios({
      method: method,
      url: url,
      data: body,
      headers,
      responseType: 'stream',
    });

    logResponse();
    if (getRawRes) {
      return response;
    } else {
      return response.data;
    }
  }
}
