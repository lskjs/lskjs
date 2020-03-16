import Module from '@lskjs/module';
// import createLogger from '@lskjs/utils/createLogger';
import forEach from 'lodash/forEach';

// const DEBUG = __DEV__ && false;
// const debug = createLogger({ name: '@lskjs/event', enable: DEBUG });

export default class EventModule extends Module {
  name = 'EventModule';
  getEvents() {
    return {};
  }
  async init() {
    await super.init();
    this.events = this.getEvents();
    this.log.trace('EventModule.events', Object.keys(this.events));
  }
  async run() {
    forEach(this.events, (fn, event) => {
      this.app.on(event, (params = {}) => fn({ ...params, event }));
    });
  }
}
