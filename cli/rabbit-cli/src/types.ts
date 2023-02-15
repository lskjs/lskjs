import { Interface } from 'readline';

export interface IWatchStream extends Interface {
  paused: boolean;
  closed: boolean;
}
export type watchStream = IWatchStream;
export type watchQueue = any[];
export type watchCallback = (raw: any, i: number) => void;
export type watchOptions = {
  concurrency?: number;
};
export type watchExtractFn = (a: Record<string, unknown>) => Record<string, unknown>;
export type watchParseFn = (a: string) => Record<string, unknown>;
export type watchFn = (stream: watchStream, cb: watchCallback, options: watchOptions) => watchStream;

export type publishOptions = {
  uri?: string;
  parseFn?: watchParseFn;
  extractFn?: watchExtractFn;
  queue?: string;
  exchange?: string;
  key?: string;
  priority?: number;
  expiration?: number;

  data?: any;

  concurrency?: number;
  maxPriority?: number;
  isConfirm?: boolean;
};
