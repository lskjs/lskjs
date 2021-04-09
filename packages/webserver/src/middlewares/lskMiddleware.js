import forEach from 'lodash/forEach';
import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';
import { nanoid } from 'nanoid/non-secure';

import getReqData from '../utils/getReqData';
import applyLogger from './accessLogger/applyLogger';

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
        if (__DEV__) {
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
      if (config.reqI18 && req.getLocale) {
        if (debug) webserver.log.trace('apply reqI18 @@@');
        req.getLocale = webserver.helpers.getReqLocale;
        const i18Module = await webserver.app.module('i18');
        req.i18 = await i18Module.instance(req.getLocale());
        forEach(webserver.responses, (val, key) => {
          res[key] = val.bind(res);
        });
      }

      /**
       * res submiddleware
       */
      if (config.res) {
        if (debug) webserver.log.trace('apply reqI18');
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

      next();
    } catch (err) {
      webserver.log.error('lskMiddleware', err);
      next(err);
    }
  };
