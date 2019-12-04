import get from 'lodash/get';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../config';

const { middlewares: defaultOptions } = config;

export default (ctx) => {
  const middlewares = [];
  const preMiddlewares = [
    [
      bodyParser.json,
      get(ctx, 'config.middlewares.bodyParser.json'),
      get(defaultOptions, 'bodyParser.json'),
    ],
    [
      bodyParser.urlencoded,
      get(ctx, 'config.middlewares.bodyParser.urlencoded'),
      get(defaultOptions, 'bodyParser.urlencoded'),
    ],
    [
      cookieParser,
      get(ctx, 'config.middlewares.cookieParser'),
      get(defaultOptions, 'cookieParser'),
    ],
    [
      cors,
      get(ctx, 'config.middlewares.cors'),
      get(defaultOptions, 'cors'),
    ],
  ];
  preMiddlewares.forEach(([middleware, options1, options2]) => {
    if (options1) {
      if (options1 === true && options2 != null) {
        middlewares.push(middleware(options2));
      } else {
        middlewares.push(middleware(options1));
      }
    } else if (options2 != null) {
      middlewares.push(middleware(options2));
    }
  });
  return middlewares;
};
