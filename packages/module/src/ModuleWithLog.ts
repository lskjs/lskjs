import { Logger as Log, ILogger as ILog } from '@lskjs/log2';
import get from 'lodash/get';
import { IModuleWithLog } from './types';
import { ModuleWithConfig } from './ModuleWithConfig';

const ms = (date1: Date, date2: Date) => {
  const msc = Math.abs(Number(date1) - Number(date2));
  return `${msc}ms`;
};

const defaultLogLevel = 'info';

export abstract class ModuleWithLog extends ModuleWithConfig implements IModuleWithLog {
  log: ILog;
  debug?: boolean;
  // debug = true;

  createLog(): ILog {
    const logProps = get(this, 'config.log', {});
    return new Log({ level: defaultLogLevel, name: this.name, ...logProps });
  }

  async init(): Promise<void> {
    await super.init();
    if (!this.log) this.log = this.createLog();
    if (this.config.debug != null && this.debug !== true) this.debug = this.config.debug;
    // console.log('LOOOOOOO', { name: this.name, debug1: this.config.debug, debug2: this.debug }); // , parent: this.parent
    if (this.debug) this.log.trace('init');
  }

  async run(): Promise<void> {
    await super.run();
    if (this.debug) this.log.trace('run');
  }

  async stop(): Promise<void> {
    await super.stop();
    if (this.debug) this.log.trace('stop');
  }

  async __lifecycleEvent(name: string, value = new Date()): Promise<void> {
    await super.__lifecycleEvent(name, value);
    if (this.debug) {
      if (name === 'initFinish') {
        this.log.trace(`init finished in [${ms(this.__lifecycle.initFinish!, this.__lifecycle.initStart!)}]`);
      }
      if (name === 'runFinish') {
        this.log.trace(`run finished in [${ms(this.__lifecycle.runFinish!, this.__lifecycle.runStart!)}]`);
      }
      if (name === 'stopFinish') {
        this.log.trace(`stop finished in [${ms(this.__lifecycle.stopFinish!, this.__lifecycle.stopStart!)}]`);
      }
    }
  }
}

export default ModuleWithLog;