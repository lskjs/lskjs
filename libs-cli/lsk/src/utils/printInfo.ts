import { mapValues } from '@lskjs/algos';
// @ts-ignore
import { getCwdInfo, getLskConfig } from '@lskjs/cli-utils';
import env from '@lskjs/env';

// @ts-ignore
export function printInfo({ config, log } = {}) {
  const pad = (a: string) => `${a} `.padEnd(14);
  log(pad('[Version]  '), config.version);
  // log(pad('System:    '), config.userAgent);
  // log(pad('CLI:       '), config.root);
  // log(pad("Scripts: "), config.version);

  const cwd = process.cwd();

  log(pad(''));
  log(pad('[CWD]      '), cwd);
  // @ts-ignore
  mapValues(getCwdInfo({ cwd }), (value: string, key: string) => {
    log(pad(`${key}:`), value);
  });

  log(pad(''));
  log(pad('[ENV]      '));
  // @ts-ignore
  mapValues(env, (value: any, key: string) => {
    log(pad(`${key}:`), value);
  });

  // log(pad('printInfo:'), __dirname);
  // eslint-disable-next-line no-console
  if (process.env.DEBUG) {
    const lskrc = getLskConfig();
    log(pad('[lskrc]'), lskrc);
    log(pad('[config]'), config);
  }
}

export default printInfo;
