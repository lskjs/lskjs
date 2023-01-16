/* eslint-disable no-param-reassign */
import { tryJSONparse } from '@lskjs/env';

import { ILogger } from '../types';
import { tryLogfmtParse } from '../utils/tryLogfmtParse';
import { parse } from './formats';
import { prettyFormat } from './prettyFormat';

export const prettyRawLog = (log: ILogger, raw: any): void => {
  let json;
  let format;
  if (typeof raw === 'string') {
    if (!json && !!raw.trim()) {
      json = tryJSONparse(raw, null);
      if (json !== null) format = 'json';
    }
    if (!json && !!raw.trim()) {
      json = tryLogfmtParse(raw, null);
      if (json !== null) format = 'logfmt';
    }
  }

  if (json === null) {
    json = null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    format = 'raw';
  }
  if (!json) {
    log.log(...prettyFormat({}, raw));
    return;
  }
  if (typeof json !== 'object') {
    log.log(...prettyFormat({}, json));
    return;
  }
  const { meta, args = [] } = parse(json);
  // console.log({ json, format, meta, args });
  // const args = [];
  // if (meta.msg !== null) args.push(meta.msg);
  // if (Object.keys(data).length) args.push(data);
  log.log(...prettyFormat(meta, ...args));
};

export default prettyRawLog;
