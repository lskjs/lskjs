import { isDev } from '@lskjs/env';
import jwt from 'express-jwt';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';
import { nanoid } from 'nanoid/non-secure';

import getReqData from '../helpers/getReqData';
import { applyLogger } from './accessLogger/applyLogger';

export default (webserver) =>
  async function lskMiddleware(req, res, next) {
    try {
      const config = get(webserver, 'config.middlewares.lsk', {});
      const debug = false;

      /**
       * reqId submiddleware
       */
      if (config.reqId) {
        if (debug) webserver.log.trace('apply reqId');
        if (isDev) {
          global.reqId = 1 + (global.reqId || 0);
          req.reqId = global.reqId;
        } else {
          req.reqId = nanoid();
        }
      }

      /**
       * reqLog submiddleware
       */
      if (config.reqLog && webserver.log) {
        if (debug) webserver.log.trace('apply reqLog');
        const reqLogConfig = isPlainObject(config.reqLog) ? config.reqLog : {};
        if (config.reqId) {
          reqLogConfig.reqId = req.reqId;
        }
        req.log = webserver.log.createChild({
          __log: 'req',
          ns: `${webserver.log.ns}:req`,
          name: `req`,
          ...reqLogConfig,
        });
      }

      /**
       * reqData submiddleware
       */
      if (config.reqData) {
        if (debug) webserver.log.trace('apply reqData');
        req.data = getReqData(req, config.reqData.jsonParse);
      }

      /**
       * reqI18 res
       */
      if (config.reqI18) {
        if (debug) webserver.log.trace('apply reqI18');
        if (!req.getLocale) req.getLocale = webserver.helpers.getReqLocales.bind(req);
        const i18Module = await webserver.app.module('i18');
        req.locale = req.getLocale();
        req.i18 = await i18Module.instance(req.locale);
      }

      /**
       * res submiddleware
       */
      if (config.res) {
        if (debug) webserver.log.trace('apply res');
        forEach(webserver.responses, (val, key) => {
          res[key] = val.bind(res);
        });
      }

      /**
       * logger submiddleware
       */
      if (config.logger || config.accessLogger) {
        if (debug) webserver.log.trace('apply logger');
        applyLogger(req, res);
      }

      // /**
      //  * user submiddleware
      //  */
      // if (config.reqUser) {
      //   if (!get(webserver, 'config.middlewares.reqUser')) return next();
      //   if (!webserver.helpers.getReqToken) throw next('!helpers.getReqToken');
      //   const jwtConfig = get(webserver, 'config.jwt', {});
      //   console.log({ jwtConfig });
      //   const { secret, algorithms = ['HS256'] } = jwtConfig;
      //   const options = {
      //     secret,
      //     algorithms,
      //     getToken: webserver.helpers.getReqToken,
      //   };
      //   return jwt(options)(req, res, (err) => {
      //     if (err) req.__errJwt = err;
      //     next();
      //   });
      // }

      next();
    } catch (err) {
      webserver.log.error('lskMiddleware', err);
      next(err);
    }
  };
