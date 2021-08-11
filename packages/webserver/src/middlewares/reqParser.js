import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import get from 'lodash/get';

import config from '../config';

const { middlewares: defaultOptions } = config;

export default (webserver) => {
  const middlewares = [];
  const preMiddlewares = [
    [bodyParser.json, get(webserver, 'config.middlewares.bodyParserJson'), get(defaultOptions, 'bodyParserJson')],
    [express.urlencoded, get(webserver, 'config.middlewares.urlencoded'), get(defaultOptions, 'urlencoded')],
    [cookieParser, get(webserver, 'config.middlewares.cookieParser'), get(defaultOptions, 'cookieParser')],
    [cors, get(webserver, 'config.middlewares.cors'), get(defaultOptions, 'cors')],
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
