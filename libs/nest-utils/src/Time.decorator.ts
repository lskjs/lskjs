import { createLogger } from '@lskjs/log/lib/createLogger';

const log = createLogger('Time', { ns: 'time' });

export function Time(initKey?: string) {
  return function (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async function (...args: any[]) {
      const startedAt = Date.now();
      const response = await method.apply(this, args);
      const finishedAt = Date.now();
      const time = finishedAt - startedAt;

      const key = initKey || `${this.constructor.name}.${propertyKey}`;
      const str = `${key} ${time}ms`;
      // if (this.log) {
      //   this.log.trace(`[Time] ${key} ${time}ms`);
      // } else {
      log.trace(str);
      // }
      return response;
    };
  };
}
