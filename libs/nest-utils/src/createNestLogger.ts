import { mapValues } from '@lskjs/algos';
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

  const loggerLike: ILogger = mapValues(mapper, (lskLevel) => (...args: any[]) => {
    const name = args.pop();
    const baseName = log.name;
    log.name = name;
    const res = log[lskLevel](...args);
    log.name = baseName;
    return res;
  });

  return loggerLike;
};
