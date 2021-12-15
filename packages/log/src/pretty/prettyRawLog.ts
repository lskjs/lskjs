/* eslint-disable no-param-reassign */
import { ILogger } from '../types';
import { parse } from '../utils/formats';
import { tryJSONparse } from '../utils/tryJSONparse';
import { prettyFormat } from './prettyFormat';

export const prettyRawLog = (log: ILogger, raw: any): void => {
  const json = tryJSONparse(raw);

  if (!json) {
    log.log(...prettyFormat({}, raw));
    return;
  }
  if (typeof json !== 'object') {
    log.log(...prettyFormat({}, json));
    return;
  }

  const { meta, args = [] } = parse(json);

  // console.log({ json, meta, args });

  // const args = [];
  // if (meta.msg !== null) args.push(meta.msg);
  // if (Object.keys(data).length) args.push(data);
  log.log(...prettyFormat(meta, ...args));
};

export default prettyRawLog;
