import { ILogger } from '../types';
import { parse } from '../utils/formats';
import { tryJSONparse } from '../utils/tryJSONparse';
import { prettyFormat } from './prettyFormat';

export const prettyRawLog = (log: ILogger, raw: any): void => {
  const json = tryJSONparse(raw);
  if (!json) {
    log.log(raw);
    return;
  }
  const args = parse(json);
  // @ts-ignore
  log.__logger(...prettyFormat(log, ...args));
};

export default prettyRawLog;
