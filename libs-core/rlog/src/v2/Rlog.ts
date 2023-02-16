/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { isClient, isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import { ILoggerMessage } from '@lskjs/log';
import { levelsPriority } from '@lskjs/log/config';
import { prettyFormat } from '@lskjs/log/pretty/prettyFormat';
import { env } from '@lskjs/log/utils/env';
import { stringify } from '@lskjs/log/utils/formats';
import { isLsklogWeb } from '@lskjs/log/utils/formats/lsklog';
import { omitNull } from '@lskjs/log/utils/omitNull';
import axios from 'axios';

import { RlogLevelType } from './types';
import checkLimits from './utils/checkLimits';

const LOG_LEVEL = () => env('LOG_LEVEL', '');
const LOG_FORMAT = () => env('LOG_FORMAT', isDev || isClient ? 'pretty' : 'lsk');

const statuses = {
  _default: '',
  log: '🗯',
  trace: '🗯',
  start: '🕑',
  info: '❕',
  debugger: '🔎',
  success: '✅',
  warn: '❗️',
  error: '❌',
  fatal: '⛔️',
};

const limits = {
  sum: 9999999999,
  '1hour': 300,
  '5min': 60,
  '1min': 30,
  '10sec': 10,
};

export class Rlog {
  name = 'RlogModule';
  ns = 'rlog';
  level = 'trace';
  base = '';
  prefix = '';
  project = '';
  secret = null;
  statuses = statuses;
  limits = limits;
  stats = {};

  constructor(params: any = {}) {
    Object.assign(this, params);
  }
  async __send(text: string, params: any): Promise<any> {
    const { base, project, secret } = this;
    const { level: action, tags = [] } = params;

    if (!(params.force || params.ignoreLimits) && !checkLimits(this.stats, limits)) {
      console.warn('[Rlog] IGNORE BY LIMITS');
      return null;
    }

    const url = [base, project].filter(Boolean).join('/');

    return axios
      .post(url, {
        secret,
        action,
        status: statuses[action] || statuses._default,
        text,
        tags,
      })
      .catch((err) => {
        console.error(`Rlog [${action}]`, Err.getCode(err));
        return null;
      });
  }
  async __log(level: RlogLevelType, ...args: any[]): Promise<void> {
    const params = { action: level };
    const [mainArg, ...otherArgs] = args;
    let meta: ILoggerMessage = {
      name: this.name,
      ns: this.ns,
      level,
      time: new Date(),
    };
    let passArgs = args;
    if (isLsklogWeb(mainArg)) {
      console.log('isLsklogWeb');
      meta = {
        ...meta,
        ...mainArg,
      };
      passArgs = otherArgs;
    }
    if (LOG_FORMAT() === 'none') return;
    if (LOG_FORMAT() === 'pretty') {
      await this.__send(prettyFormat(omitNull(meta), ...passArgs).join(' '), params);
      return;
    }
    await this.__send(stringify(LOG_FORMAT(), omitNull(meta), ...passArgs), params);
  }

  getLevelPriority(level: string): number {
    return levelsPriority[level] || 0;
  }
  canLog(level: string): boolean {
    const logLevel = this.getLevelPriority(level);
    const currentLevel = this.getLevelPriority(this.level);
    const globalLevel = this.getLevelPriority(LOG_LEVEL());
    return logLevel >= currentLevel && logLevel >= globalLevel;
  }

  async send(...args: any[]): Promise<void> {
    await this.__log('log', ...args);
  }
  async trace(...args: any[]): Promise<void> {
    if (!this.canLog('trace')) return;
    await this.__log('trace', ...args);
  }
  async start(...args: any[]): Promise<void> {
    if (!this.canLog('start')) return;
    await this.__log('start', ...args);
  }
  async success(...args: any[]): Promise<void> {
    if (!this.canLog('success')) return;
    await this.__log('success', ...args);
  }
  async info(...args: any[]): Promise<void> {
    if (!this.canLog('info')) return;
    await this.__log('info', ...args);
  }
  async warn(...args: any[]): Promise<void> {
    if (!this.canLog('warn')) return;
    await this.__log('warn', ...args);
  }
  async error(...args: any[]): Promise<void> {
    if (!this.canLog('error')) return;
    await this.__log('error', ...args);
  }
  async fatal(...args: any[]): Promise<void> {
    if (!this.canLog('fatal')) return;
    await this.__log('fatal', ...args);
  }
}

export default Rlog;
