export type LoggerLevelType = 'fatal' | 'error' | 'warn' | 'debug' | 'info' | 'trace' | 'log';

export interface ILoggerProps {
  prefix?: string | null;
  ns?: string | null;
  name?: string | null;
  level?: string | null;
}
export interface ILoggerMessage {
  code?: any;
  name?: string | null;
  ns?: string | null;
  level?: string | number;
  time?: string | number;
  msg?: string;
  data?: any;
}

export interface ILogger extends ILoggerProps {
  trace(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  fatal(...args: any[]): void;
  log(...args: any[]): void;
}
