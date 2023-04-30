/* eslint-disable no-param-reassign */
import { omitNull } from '@lskjs/algos';
import { isDebug } from '@lskjs/env';
import { Err } from '@lskjs/err';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as BaseExceptionFilter,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import stringify from 'fast-safe-stringify';

// TODO: дописать

const isDeepDebug = !!process.env.DEBUG;
const isEmpty = (obj = {}) => !Object.keys(obj).length;

@Catch(Err)
export class AnyExceptionFilter implements BaseExceptionFilter {
  private readonly log = new Logger(AnyExceptionFilter.name);
  catch(err: Err, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    // @ts-ignore
    let status = err?.status;
    if (!status || !(status >= 200 && status <= 600)) {
      status = 500;
    }

    const logInfo: Record<string, unknown> = {
      url: req.url,
      status,
      query: req.query,
      body: req.body,
      headers: req.headers,
    };
    this.logError(err, logInfo);

    // @ts-ignore
    const debug = isDebug && !isEmpty(err?.debug) ? err?.debug : null;

    let code = err?.code;
    if (!code) code = `status${status}`;

    let message: string | undefined = err?.message;
    if (message === code) message = undefined;
    if (code && !message) {
      // TODO: i18 errors
      // const { i18 } = req;
      // message = i18 && i18.exists(`errors.${code}`) ? i18.t(`errors.${code}`) : code;
    }
    // @ts-ignore
    const data = err?.data;

    const response: Record<string, unknown> = omitNull({
      code,
      statusCode: status,
      message,
      debug,
      data,
    });

    return res.status(status).send(stringify(response, undefined, isDebug ? 2 : 0));
  }

  logError(err: Err, logInfo: any = {}) {
    if (isEmpty(logInfo.query)) delete logInfo.query;
    if (isEmpty(logInfo.body)) delete logInfo.body;
    if (!isDeepDebug || isEmpty(logInfo.headers)) delete logInfo.headers;
    if (logInfo.status >= 500) {
      this.log.error(err);
    } else if (logInfo.status >= 400) {
      this.log.debug(err);
    }
    this.log.verbose('[req]', logInfo);
  }
}
