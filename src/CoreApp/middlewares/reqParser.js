import _ from 'lodash';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

export default (ctx) => {
  const middlewares = [];
  const preMiddlewares = [
    [
      bodyParser.json,
      _.get(ctx, 'config.middlewares.bodyParser.json'),
      _.get(ctx, 'defaultOptions.bodyParser.json'),
    ],
    [
      bodyParser.urlencoded,
      _.get(ctx, 'config.middlewares.bodyParser.urlencoded'),
      _.get(ctx, 'defaultOptions.bodyParser.urlencoded'),
    ],
    [
      cookieParser,
      _.get(ctx, 'config.middlewares.cookieParser'),
      _.get(ctx, 'defaultOptions.cookieParser'),
    ],
    [
      cors,
      _.get(ctx, 'config.middlewares.cors'),
      _.get(ctx, 'defaultOptions.cors'),
    ],
  ];
  preMiddlewares.forEach(([middleware, options1, options2]) => {
    if (options1 === true && options2 !== false) {
      middlewares.push(middleware(options2));
    } else if (options1) {
      middlewares.push(middleware(options1));
    }
    // else ignore if (null, false, undefined)
  });
  return middlewares;
};
