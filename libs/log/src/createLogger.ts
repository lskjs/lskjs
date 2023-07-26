import { getEnvConfig } from './getEnvConfig';
import { Logger } from './Logger';
import { ILogger } from './types';

export const createLogger = (propsOrName = {}, props = {}): ILogger => {
  const prm = {
    ...(typeof propsOrName === 'string' ? { name: propsOrName } : propsOrName),
    ...getEnvConfig(),
    ...props,
  } as any;
  const name = [prm.ns, prm.name].filter(Boolean).join(':');
  if (prm.on?.some((v: RegExp) => v.test(name))) {
    prm.level = 'trace';
  }
  if (prm.off?.some((v: RegExp) => v.test(name))) {
    prm.level = 'fatal';
  }
  return new Logger(prm);
};
