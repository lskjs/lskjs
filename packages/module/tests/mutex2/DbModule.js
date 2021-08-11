import Module from '../../src';

const delay = (duration) => new Promise((resolve) => setTimeout(() => resolve(), duration));

export class DbModule extends Module {
  connected = false;
  async run() {
    super.run();
    await delay(3000);
    this.connected = true;
  }
}

export default DbModule;
