import { parse } from '../utils/formats';
import { tryJSONparse } from '../utils/tryJSONparse';
import { prettyLog } from './utils';

export const prettyRawLog = (log: Logger, raw: any): void => {
  const json = tryJSONparse(raw);
  if (!json) {
    log.log(raw);
    return;
  }
  const args = parse(json);
  prettyLog(log, ...args);
};

export default prettyRawLog;
