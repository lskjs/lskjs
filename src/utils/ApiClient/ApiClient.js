// import fetch from 'node-fetch';
import _ from 'lodash';
import io from '../socket-io-universal';
import trim from '../trim';
import qs from 'qs';
import fetch from 'isomorphic-fetch';

const FETCH_PARAMS = [
  'method',
  'url',
  'headers',
  'context',
  'referrer',
  'referrerPolicy',
  'mode',
  'credentials',
  'redirect',
  'integrity',
  'cache',
];

export default class ApiClient {
  qs = qs

  constructor(params) {
    // console.log('ApiClient', params);
    this.log = params.log;
    this.root = params.root;
    this.base = params.base;
    this.url = params.url;
    this.wsConfig = params.ws;
    this.authToken = params.authToken || null;
  }

  setAuthToken(authToken) {
    this.authToken = authToken;
  }

  static createReq(req) {
    // req.path,
    // req.query,
    return {
      ...req,
      create(params) {
        const query = qs.stringify(params);
        return (this.path || '/') + (query ? `?${query}` : '');
      },
      merge(params) {
        return this.create({
          ...this.query,
          ...params,
        });
      },
    };
  }

  async throwError({ err, res, req }) {
    if (__DEV__) {
      const str = `\
==============
  fetch error:
${_.isPlainObject(err) ? JSON.stringify(err, null, 2) : err}
  req:
${JSON.stringify(req, null, 2)}
  json:
${JSON.stringify(res.json, null, 2)}
==============\
`;
      console.error(str);
    }
    const message = err && err.message || err;
    const err2 = new Error(_.isPlainObject(message) ? JSON.stringify(message) : message);
    err2.res = res;
    err2.req = req;
    throw err2;
  }

  async afterFetch(ctx) {
    const { res, throwError } = ctx;
    if (res.status >= 400) {
      const type = 'RES_STATUS_ERROR';
      await throwError({
        ...ctx,
        err: {
          type,
          status: res.status,
          statusText: res.statusText,
          message: `${type}: ${res.status} ${res.statusText}`,
        },
      });
    }
    if (res.json && res.json.err) {
      await throwError({
        ...ctx,
        err: {
          type: 'CUSTOM_ERROR',
          ...res.json.err,
        }
      });
    }
    return res.json;
  }

  createUrl(path, options = {}) {
    if (path.substr(0, 5) === 'http:' || path.substr(0, 6) === 'https:') {
      return path;
    }
    const url = options.url || this.url || '/';
    const base = options.base || this.base;
    const array = [url, path[0] === '/' ? null : trim(base), trim(path)];
    return array
      .map(a => trim(a))
      .filter((a, i) => (i === 0 || a))
      .join('/');
  }

  getCtx(url, params = {}) {
    const req = Object.assign(
      { url },
      _.pick(params, FETCH_PARAMS),
    );

    const body = params.body || params.data;
    if (_.isPlainObject(body)) {
      req._body = body;
      req.body = JSON.stringify(body);
    } else if (typeof body === 'string') {
      req._body = body;
      req.body = body;
    }
    if (!req.headers) req.headers = {};
    if (!req.headers.Accept) req.headers.Accept = 'application/json';
    if (!req.headers['Content-Type']) req.headers['Content-Type'] = 'application/json; charset=utf-8';
    if (req.headers['Content-Type'] === '!') {
      delete req.headers['Content-Type'];
    }
    const authToken = (params.authToken || this.authToken);
    if (!req.headers.Authorization && authToken) {
      req.headers.Authorization = `Bearer ${authToken}`;
    }

    req.qs = params.queryParams || params.qs;
    if (req.qs) {
      req.url += (req.url.indexOf('?') === -1 ? '?' : '&') + qs.stringify(req.qs);
    }
    req.url = this.createUrl(req.url);

    if (!req.method) {
      req.method = 'GET';
    }
    const throwError = params.throwError || this.throwError;
    const afterFetch = params.afterFetch || this.afterFetch;
    const parseResult = params.parseResult || this.parseResult;

    return {
      req,
      authToken,
      throwError,
      afterFetch,
      parseResult,
    };
  }

  async parseResult(ctx, result) {
    const res = {
      result,
      status: result.status,
      statusText: result.statusText,
    };
    try {
      res.text = await result.text();
    } catch (err) {
      const type = 'TEXT_PARSE_ERROR';
      await ctx.throwError({
        ...ctx,
        res,
        err: {
          type,
          message: type,
          err,
        },
      });
    }
    try {
      res.json = JSON.parse(res.text);
    } catch (err) {
      const type = 'JSON_PARSE_ERROR';
      await ctx.throwError({
        ...ctx,
        res,
        err: {
          type,
          message: type,
          err,
        },
      });
    }
    return res;
  }

  fetch(...args) {
    const ctx = this.getCtx(...args);
    const { req, parseResult, afterFetch } = ctx;
    if (this.log && this.log.trace) {
      this.log.trace('[api]', req.method, req.url, req._body);
    }
    const { url, ...params } = req;
    return fetch(url, params)
    .then(async (result) => {
      ctx.res = await parseResult(req, result);
      return ctx;
    })
    .then(afterFetch);
  }


  ws(path = '', options = {}) {
    if (!this.wsConfig) {
      console.error('Вы не можете использовать api.ws без сокет конфигов');
      return null;
    }
    const opts = Object.assign({}, this.wsConfig && this.wsConfig.options, options);

    // console.log(opts.query, opts.query.token, this.authToken);
    if (!(this.wsConfig && this.wsConfig.tokenInCookie)) {
      if (opts.query && !opts.query.token && this.authToken) opts.query.token = this.authToken;
    }
    // console.log(opts.query, opts.query.token, this.authToken);

    return io(
      this.createUrl(path, this.wsConfig),
      opts,
    );
  }
}
