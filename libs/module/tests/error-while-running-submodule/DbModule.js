import Module from '../../src';

export class DbModule extends Module {
  connected = false;
  async run() {
    super.run();
    setTimeout(() => {
      this.connected = true;
    }, 1000);
  }
}

export default DbModule;
