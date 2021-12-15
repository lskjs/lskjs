import { ILoggerInternalMessage } from '../../types';
import { createMsg, getErrCode } from '../createMsg';
import { isBunyan, parseBunyan, stringifyBunyan } from './bunyan';
import { isLogrus, parseLogrus, stringifyLogrus } from './logrus';
import { isLsklog, isLsklogWeb, parseLsklog, stringifyLsklog } from './lsklog';

export function detectFormat(json: any): string | null {
  if (isBunyan(json)) return 'bunyan';
  if (isLsklog(json)) return 'lsklog';
  if (isLsklogWeb(json)) return 'lsklogweb';
  if (isLogrus(json)) return 'logrus';
  return null;
}

export function stringify(format: string, meta: Record<string, unknown>, ...args: any[]): any {
  const code = getErrCode(args);
  const msg = createMsg(args);
  const data = {
    code,
    ...meta,
    msg,
  };
  if (format === 'bunyan') return stringifyBunyan(data);
  if (format === 'logrus') return stringifyLogrus(data);
  return stringifyLsklog(data);
}

export function parse(json: any): ILoggerInternalMessage {
  const format = detectFormat(json);
  // console.log({ format });
  if (format === 'buyan') return parseBunyan(json);
  if (format === 'lsklogweb') return parseLsklog(json);
  if (format === 'lsklog') return parseLsklog(json);
  if (format === 'logrus') return parseLogrus(json);
  return { meta: {}, args: [json] };
}
