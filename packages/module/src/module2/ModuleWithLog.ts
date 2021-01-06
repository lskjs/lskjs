import { Logger as Log, ILogger as ILog } from '@lskjs/log2';
import get from 'lodash/get';
import { IModuleWithLog } from './types';
import { ModuleWithConfig } from './ModuleWithConfig';

export abstract class ModuleWithLog extends ModuleWithConfig implements IModuleWithLog {
  log: ILog;
  debug?: boolean;

  createLog(): ILog {
    const logProps = get(this, 'config.log', {});
    return new Log({ ...logProps, name: this.name });
  }

  async init(): Promise<void> {
    await super.init();
    if (!this.log) this.log = this.createLog();
    if (this.debug && this.log) this.log.trace('init');
  }

  async run(): Promise<void> {
    await super.run();
    if (this.debug && this.log) this.log.trace('run');
  }

  async stop(): Promise<void> {
    await super.stop();
    if (this.debug && this.log) this.log.trace('stop');
  }
}

export default ModuleWithLog;
