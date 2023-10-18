import { ApiProperty } from '@nestjs/swagger';
import { TResultCodeData } from '../resultCode';

export class BasicResponse<T> {
  private _status = 0;
  private _resultCode = '00';
  private _message: string = null;
  private _error?: string;
  private _data: T;

  constructor(
    status?: number,
    resultCode?: string,
    message?: string,
    error?: string,
    data?: T,
  ) {
    if (status) {
      this._status = status;
      this._resultCode = resultCode;
      this._message = message;
      this._error = error;
      this._data = data;
    }
    return this;
  }

  get(key) {
    return this[`_${key}`];
  }

  getStatus() {
    return this._status;
  }

  getError(key?: string) {
    if (key) return this._error[key] || '';
    return this._error;
  }

  status(status: number) {
    this._status = status;
    return this;
  }

  /**
   * resultCode를 인자값으로 설정한다.
   * @param code
   */
  resultCode(code: string);
  /**
   * 미리 정의한 resultCodeData로 resultCode와 message 값을 정의한다.
   * @param code
   */
  resultCode(code: TResultCodeData);
  resultCode(code: string | TResultCodeData) {
    if (typeof code === 'string') {
      this._resultCode = code;
    } else {
      this._resultCode = code.code;
      this._message = code.description;
    }
    return this;
  }

  message(message: string) {
    this._message = message;
    return this;
  }

  error(error: string) {
    this._error = error;
    return this;
  }

  data<O extends T>(data?: O) {
    this._data = data;
    return this;
  }

  getData(): T {
    return this._data;
  }

  toJSON() {
    return {
      status: this._status,
      resultCode: this._resultCode,
      message: this._message,
      error: this._error,
      data: this._data,
    };
  }
}
