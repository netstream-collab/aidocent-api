import axios from 'axios';
import _l from 'src/server/constants/logger/CommonLogger';
type TMethod =
  | 'get'
  | 'post'
  | 'fetch'
  | 'delete'
  | 'GET'
  | 'POST'
  | 'FETCH'
  | 'DELETE';

axios.defaults.withCredentials = true;

async function RestApi(
  method: TMethod,
  url: string,
  headers?: any,
  body?: any,
  getRawRes?: boolean,
): Promise<any> {
  function logResponse() {
    const { status, statusText, headers, data } = response;
    const resLog = { status, statusText, headers, data };
    _l.name('RestApi').log('RestApi RESPONSE:', resLog);
    _l.name('RestApi').log(
      'RestApi RESPONSE URL:',
      response.request.res.responseUrl,
    );
    // console.log('RestApi RESPONSE:', response.request.res.headers);
  }
  function logRequest() {
    _l.name('RestApi').log(`RestApi REQUEST: ${method} ${url}`);
    _l.name('RestApi').log(
      `RestApi REQUEST BODY: ${body ? JSON.stringify(body) : ''}`,
    );
  }

  if (!url) {
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

export default RestApi;
