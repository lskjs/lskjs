import get from 'lodash/get';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

export default (ctx) => {
  const middlewares = [];
  const preMiddlewares = [
    [
      bodyParser.json,
      get(ctx, 'config.middlewares.bodyParser.json'),
      get(ctx, 'defaultOptions.bodyParser.json'),
    ],
    [
      bodyParser.urlencoded,
      get(ctx, 'config.middlewares.bodyParser.urlencoded'),
      get(ctx, 'defaultOptions.bodyParser.urlencoded'),
    ],
    [
      cookieParser,
      get(ctx, 'config.middlewares.cookieParser'),
      get(ctx, 'defaultOptions.cookieParser'),
    ],
    [
      cors,
      get(ctx, 'config.middlewares.cors'),
      get(ctx, 'defaultOptions.cors'),
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
