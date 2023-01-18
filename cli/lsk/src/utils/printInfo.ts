const { mapValues } = require('@lskjs/algos');
const { getCwdInfo, getLskConfig } = require('@lskjs/cli-utils');

// @ts-ignore
export function printInfo({ config, log } = {}) {
  const pad = (a: string) => `${a} `.padEnd(14);
  log(pad('[Version]  '), config.version);
  log(pad('System:    '), config.userAgent);
  log(pad('CLI:       '), config.root);
  // log(pad("Scripts: "), config.version);

  log(pad(''));
  const cwd = process.cwd();
  log(pad('[CWD]      '), cwd);

  mapValues(getCwdInfo({ cwd }), (value: string, key: string) => {
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
