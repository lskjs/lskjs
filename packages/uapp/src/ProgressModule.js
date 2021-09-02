// eslint-disable-next-line max-classes-per-file
import Module from '@lskjs/module';

export class ProgressModule extends Module {
  init() {
    this.__parent.on('resolve:start', () => {
      if (this.current) this.current.start();
    });
    this.__parent.on('resolve:finish', () => {
      if (this.current) this.current.finish();
    });
    this.__parent.on('resolve:error', () => {
      if (this.current) this.current.finish();
    });
  }
}

export default ProgressModule;
