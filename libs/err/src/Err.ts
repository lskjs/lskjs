// import { isFunction } from 'lodash';

import { copyProps } from './copyProps';
import { errMerge } from './errMerge';
import { IErr } from './types';
import {
  errUnknown,
  getCode,
  getJSON,
  getMessage,
  getText,
  isError,
} from './utils';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export const isErr = (err: any): boolean => err instanceof Err;

// TODO: maybe use
// https://github.com/sindresorhus/serialize-error
export class Err extends Error implements IErr {
  code?: string;
  __err = true;
  // @ts-ignore
  constructor(...params: any[]) {
    const err = errMerge(...params);
    super(getMessage(err));
    this.name = this.constructor.name;
    Object.keys(err).forEach((key: any) => {
      const val = err[key];
      if (key === 'message') {
        if (this.message !== val && val) {
          // @ts-ignore
          this.__parentErrorMessage = val; // TODO: может не надо?
        }
      } else if (key === 'stack') {
        // TODO: подумать в будущем, может надо сохранять?
        // TODO: и надо как-то их мерджить
        // @ts-ignore
        this.__parentErrorStack = val;
        // console.log('this.stack', this.stack);
        // console.log('err.stack', err.stack);
      } else {
        // @ts-ignore
        this[key] = val;
      }
    });
    if (!this.code) this.code = getCode(err);
    // if (typeof Error.captureStackTrace === 'function') {
    //   Error.captureStackTrace(this, this.constructor);
    // } else {
    //   this.stack = new Error(message).stack;
    // }
  }
  static getMessage(err: any, def = errUnknown): string {
    return getMessage(err, def);
  }
  static getText(err: any, def = errUnknown): string {
    return getText(err, def);
  }
  static getCode(err: any, def = errUnknown): string {
    return getCode(err, def);
  }
  static getJSON(err: any, onlySafeField = false): Record<string, unknown> {
    return getJSON(err, onlySafeField);
  }
  static isError(err: any): boolean {
    return isError(err);
  }
  static isErr(err: any): boolean {
    return isErr(err);
  }
  static copyProps(errTo: IErr, errFrom: any) {
    copyProps(errTo, errFrom);
  }
  copyProps(errFrom: any) {
    copyProps(this, errFrom);
  }
  getText(): string {
    return getText(this);
  }
  getJSON(onlySafeField = false): Record<string, unknown> {
    return getJSON(this, onlySafeField);
  }
  getMessage(): string {
    return getMessage(this);
  }
  getCode(): string {
    return getCode(this);
  }
  toJSON(): Record<string, unknown> {
    const json = this.getJSON(true);
    return json;
  }
}

export default Err;
