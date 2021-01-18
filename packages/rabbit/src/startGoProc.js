import get from 'lodash/get';
import { spawn } from 'child_process';

const paramsToArgs = (params = {}) => Object.keys(params).map(key => [`-${key}`, params[key]].join(' '));
const serializeData = (data = {}) => {
  if (typeof data === 'string') return data;
  return JSON.stringify(data);
};
const serializeDataArray = (data = {}) => {
  if (Array.isArray(data)) {
    return data.map(serializeData);
  }
  return serializeData(data);
};

export default async function startGoProc() {
  // const { debug } = this.config;
  const debug = this.config.debug || false;
  let { uri } = this.config;
  if (uri.includes('?')) {
    uri = get(uri.split('?'), '0');
  }
  const params = {
    amqp: uri,
  };

  // const cmd = GO_RABBIT;
  const cmd = this.goRabbitPath;
  // const cmd = `${GO_RABBIT}`;
  // const cmd = `echo '${row}' | node /Users/isuvorov/projects/parser-cloud/packages/parser-cloud/rabbit-node.js`;
  const args = paramsToArgs(params);
  if (debug) {
    this.log.trace('[RM]', `${cmd} ${args.join(' ')}`);
    // echo '{"_id": "5e91cc24001c9049700945bc", "videoId": "PRsKXb4e_Bo"}' | ./rabbit -queue z-dev-TEST
  }
  const proc = spawn(cmd, args, { shell: true });
  proc.stdout.on('data', (chunk) => {
    const strings = String(chunk).split('\n');
    strings.forEach((str) => {
      if (debug) {
        this.log.trace('[RM] stdout:', str);
      }
      try {
        const json = JSON.parse(String(str));
        if (json.type === 'response') {
          this
            .emitter
            .emit(json.hash, { complete: json.complete });
        }
      } catch (e) {
        // this.log.trace(String(chunk), 'не получилось');
        /* eslint no-empty: "error" */
      }
      // this.log.trace('----------------------');
    });
  });
  proc.stderr.on('data', (chunk) => {
    this.log.error(`[RM] stderr: ${chunk}`);
  });
  proc.on('close', () => {
    if (debug) {
      this.log.warn('что то пошло не так');
    }
    this
      .emitter
      .emit('close');
    setTimeout(() => {
      this.startGoProc();
    }, 100);
  });
  this.proc = proc;
}
