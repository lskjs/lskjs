// import fetch from 'node-fetch';
import isPlainObject from 'lodash.isplainobject';
import pick from 'lodash.pick';
import qs from 'qs';
import io from './socket-io-universal';
import trim from './trim';
// import fetch from 'isomorphic-fetch';
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

// const DEBUG = __DEV__;

export default class ApiClient {
  static fetch = global.fetch;
  static qs = qs
  // io = io

  constructor(params) {
    // console.log('ApiClient', params);
    this.io = io;
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
        const query = this.qs.stringify(params);
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
    if (this.showError && this.log) {
      const str = `\
==============
  fetch error:
${isPlainObject(err) ? JSON.stringify(err, null, 2) : err}
  req:
${JSON.stringify(req, null, 2)}
  json:
${JSON.stringify(res.json, null, 2)}
==============\
`;
      this.log.error(str);
    }
    const message = err && err.message || err;
    const err2 = new Error(isPlainObject(message) ? JSON.stringify(message) : message);
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
        },
      });
    }
    return res.json;
  }

  createUrl(path, options = {}) {
    if (path.substr(0, 5) === 'http:' || path.substr(0, 6) === 'https:') {
      return path;
    }
    let url = options.url || this.url || '/';
    const port = options.port || this.port || null;

    if (url && url.length > 1 && port) {
      if (url.search(/:(\d+)/) !== -1) {
        url = url.replace(/:(\d+)/, `:${port}`);
      } else {
        url = `${url}:${port}`;
      }
    }
    console.log('createUrl', options, url);

    const base = options.base || this.base;
    const array = [url, path[0] === '/' ? null : trim(base), trim(path)];
    url = array
      .map(a => trim(a))
      .filter((a, i) => (i === 0 || a))
      .join('/');
    if (options.qs) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + this.constructor.qs.stringify(options.qs);
    }
    return url;
  }

  getCtx(url, params = {}) {
    const req = Object.assign(
      { url },
      pick(params, FETCH_PARAMS),
    );

    const body = params.body || params.data;

    if (isPlainObject(body)) {
      req._body = body;
      req.body = JSON.stringify(body);
    } else {
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
      req.url += (req.url.indexOf('?') === -1 ? '?' : '&') + this.constructor.qs.stringify(req.qs);
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
    const { fetch } = this.constructor;
    const { req, parseResult, afterFetch } = ctx;
    if (this.log && this.log.trace) {
      this.log.trace('[api]', req.method, req.url, req._body);
      // this.log.trace('[api]', req.method, req.url, req._body, req);
    }
    const { url, ...params } = req;
    return fetch(url, params)
    .then(async (result) => {
      ctx.res = await parseResult(ctx, result);
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
    const params2 = {};
    if (!this.wsConfig.tokenInCookie) {
      if (!params2.qs) params2.qs = {};
      if (params2.qs && !params2.qs.token && this.authToken) params2.qs.token = this.authToken;
    }
    // console.log(opts.query, opts.query.token, this.authToken);
    console.log({ opts }, this.createUrl(path, this.wsConfig), io);
    return io(
      this.createUrl(path, { ...this.wsConfig, ...params2 }),
      opts,
    );
  }
  ws2(path = '', params = {}) {
    if (!this.wsConfig) {
      console.error('Вы не можете использовать api.ws без сокет конфигов');
      return null;
    }
    const params2 = Object.assign({}, this.wsConfig, params);

    if (!this.wsConfig.tokenInCookie) {
      if (!params2.qs) params2.qs = {};
      if (params2.qs && !params2.qs.token && this.authToken) params2.qs.token = this.authToken;
    }

    const res = this.io(
      this.createUrl(path, params2),
      {
        ...this.wsConfig.options,
        ...params,
      },
    );
    return res;
  }

}
