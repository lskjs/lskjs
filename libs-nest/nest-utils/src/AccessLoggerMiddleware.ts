import { isDev } from '@lskjs/env';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import applyLogger from '@lskjs/webserver/middlewares/accessLogger/applyLogger';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { nanoid } from 'nanoid';

let reqId = 0;

@Injectable()
export class AccessLoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // const lskMiddleware = createLskMiddleware({
    //   config: {
    //     middlewares: {
    //       lsk: {
    //         reqId: true,
    //       },
    //     },
    //   },
    // });
    if (isDev) {
      reqId += 1;
      req.reqId = reqId;
    } else {
      req.reqId = nanoid();
    }
    applyLogger(req, res);
    next();
    // lskMiddleware(req, res, next);
  }
}
