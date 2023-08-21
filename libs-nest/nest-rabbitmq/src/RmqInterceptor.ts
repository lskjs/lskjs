import { RabbitHandlerConfig, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { omitNull } from '@lskjs/algos';
import { isDev } from '@lskjs/env';
import { Err } from '@lskjs/err';
import { createLogger } from '@lskjs/log';
import {
  applyDecorators,
  CallHandler,
  ContextType,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as amqplib from 'amqplib';
import { lastValueFrom, Observable, of } from 'rxjs';

// eslint-disable-next-line no-promise-executor-return
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// import { createLogger } from '../nest-utils/log';

// import { lskConfig } from '../../config';
export const RmqRPCConfig = {};
// import { log } from '../../log';

const deliveryAttempts: Record<string, any> = {};

const maxAttempts = isDev ? 3 : 20;
const isLog = true;
const errDelay = 1000;

const inc = (obj: Record<string, any>, key: string, val = 1) => {
  // eslint-disable-next-line no-param-reassign
  obj[key] = (obj[key] || 0) + val;
  return obj[key];
};

type RmqRPCConfigProps = Pick<
  RabbitHandlerConfig,
  | 'queue'
  | 'name'
  | 'connection'
  | 'exchange'
  | 'routingKey'
  | 'createQueueIfNotExists'
  | 'assertQueueErrorHandler'
  | 'queueOptions'
  | 'errorBehavior'
  | 'errorHandler'
  | 'allowNonJsonMessages'
>;

const log = createLogger({ ns: 'rmqrpc' });
export function RmqRPC(props: RmqRPCConfigProps & { prefetchCount?: number }) {
  const { channel } = props?.queueOptions || {};
  // @ts-ignore
  const channelConfig = RmqRPCConfig?.rabbitmq?.channels?.[channel];
  const prefetchCount = props?.prefetchCount || channelConfig?.prefetchCount || 1;
  const decorators = [];
  if (prefetchCount) {
    log.debug(`RmqRPC prefetch ${channel}=${prefetchCount}`);
    decorators.push(RabbitRPC(props));
  } else {
    log.trace(`RmqRPC prefetch ${channel}=${prefetchCount}`);
  }
  return applyDecorators(...decorators);
}

export function RmqErrorCallback(channel: amqplib.Channel, msg: amqplib.ConsumeMessage, err: any) {
  // log.debug('RmqErrorCallback', err);
  // console.log('msg', msg);
  const { replyTo, correlationId } = msg.properties;
  if (err?.status === 300 || (err?.__err && err?.rd)) {
    const { routingKey, exchange } = msg.fields;
    const rd = typeof err?.rd === 'string' ? err?.rd : `${routingKey}_rd`;
    const { pattern, data, ...meta } = err.meta || {};
    const payload = omitNull({
      pattern,
      data,
      err: Err.getJSON(err) || Err.getCode(err),
      meta: {
        ...meta,
        exchange,
        routingKey,
      },
    });
    channel.publish('', rd, Buffer.from(JSON.stringify(payload)));
  }
  if (replyTo) {
    let error;
    if (err?.__err) {
      error = JSON.stringify(err);
    } else if ((err instanceof Error) as any) {
      error = JSON.stringify({
        code: err?.code || err?.name || 1,
        message: err?.message,
      });
    } else if (typeof err === 'string') {
      error = JSON.stringify({
        code: 1,
        message: err,
      });
    } else {
      error = JSON.stringify(err);
    }
    channel.publish('', replyTo, Buffer.from(error), { correlationId });
  }
  if (err?.status === 200 || err?.status === 300) {
    channel.nack(msg, false, false);
  } else {
    channel.nack(msg, false, true);
  }
}

@Injectable()
export class RmqInterceptor implements NestInterceptor {
  private log = createLogger(this.constructor.name, { ns: 'rmq', level: 'warn' });
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const type = context.getType() as ContextType | 'rmq';
    if (type !== 'rmq') return next.handle();
    const startedAt = new Date();
    const name = context.getHandler().name || context.getClass().name;
    const message = context.getArgByIndex(0);
    const data = message?.data;
    const { fields, properties } = context.getArgByIndex(1);
    const { correlationId } = properties;
    const { redelivered } = fields;
    const messageId = correlationId;
    if (isLog) this.log.debug(`[${name}]`, 'init', data);
    try {
      if (!data) throw new Err('!data', { status: 400 });
      const res = await lastValueFrom(next.handle());
      const finishedAt = new Date();
      const duration = +finishedAt - +startedAt;
      if (isLog) this.log.info(`[${name}]`, 'success', { duration });
      const meta = { data, meta: message.meta, startedAt, finishedAt, duration };
      delete deliveryAttempts[messageId];
      return of({
        code: 0,
        data: res,
        message: 'ok',
        meta,
      });
    } catch (err) {
      const finishedAt = new Date();
      const duration = +finishedAt - +startedAt;
      const attempts = inc(deliveryAttempts, messageId);
      const isMaxAttempts = Boolean(redelivered && attempts > maxAttempts);
      const meta = { data, meta: message.meta, startedAt, finishedAt, duration, attempts };
      const status: any = (err as any)?.status;
      if (status === 200) {
        this.log.warn(`[${name}] skip`, Err.getCode(err), { duration });
      } else {
        if (isMaxAttempts) {
          this.log.warn(`[${name}] manyAttempts`, Err.getCode(err), { duration });
        } else {
          this.log.error(`[${name}] err`, Err.getCode(err), { duration });
        }
        if (isDev) {
          this.log.error(`[${name}] err`, err);
          // this.log.error(err?.stack);
          this.log.trace(`[${name}] delay`, errDelay);
          await delay(errDelay);
        }
      }
      if (isMaxAttempts) delete deliveryAttempts[messageId];
      throw new Err(err, {
        status: isMaxAttempts ? 300 : status || 500,
        meta,
      });
    }
  }
}
