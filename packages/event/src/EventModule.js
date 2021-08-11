import Module from '@lskjs/module';
import forEach from 'lodash/forEach';

export default class EventModule extends Module {
  getEvents() {
    return {};
  }
  async init() {
    await super.init();
    this.events = this.getEvents();
    this.log.debug('EventModule.events', Object.keys(this.events));
  }
  async run() {
    await super.run();
    forEach(this.events, (fn, event) => {
      this.app.on(event, (params = {}) => fn({ ...params, event }));
    });
  }
}
