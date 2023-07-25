import { mapValues } from '@lskjs/algos';
// eslint-disable-next-line import/named
import { ILogger, Logger, LoggerLevelType } from '@lskjs/log';

export interface ILoggerOptions {
  env?: string;
  context?: string;
  level?: LoggerLevelType;
  logGroupName?: string;
  params?: any;

  ns?: string;
}

export const createNestLogger = (props: ILoggerOptions = {}): ILogger => {
  const { level, ns } = props;
  const log = new Logger({ level, ns });
  const mapper = {
    info: 'info',
    log: 'trace',
    error: 'error',
    warn: 'warn',
    verbose: 'trace',
  };

  // @ts-ignore
  const loggerLike: ILogger = mapValues(mapper, (lskLevel) => (...args: any[]) => {
    const name = args.pop();
    const baseName = log.name;
    log.name = name;
    // @ts-ignore
    const res = log[lskLevel](...args);
    log.name = baseName;
    return res;
  });

  return loggerLike;
};
