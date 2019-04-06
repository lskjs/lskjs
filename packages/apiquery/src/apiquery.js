/* eslint-disable  */
// import fetch from 'node-fetch';
import isPlainObject from 'lodash/isPlainObject';
import pick from 'lodash/pick';
import qs from 'qs';
import FormData from 'form-data';
import io from './socket.io-client';
import trim from './trim';

const AXIOS_PARAMS = [
  'url',
  'method',
  'baseURL',
  'transformRequest',
  'transformResponse',
  'headers',
  'params',
  'paramsSerializer',
  'data',
  'timeout',
  'withCredentials',
  'adapter',
  'auth',
  'responseType',
  'responseEncoding',
  'xsrfCookieName',
  'xsrfHeaderName',
  'onUploadProgress',
  'onDownloadProgress',
  'maxContentLength',
  'validateStatus',
  'maxRedirects',
  'socketPath',
  'httpAgent',
  'httpsAgent',
  'proxy',
  'cancelToken',
];

function ioMock(...initParams) {
  // __DEV__ && console.log('ioMock', ...initParams);
  // const socket = io(...params)
  const mock = {
    Manager: io.Manager,
    Socket: io.Socket,
    connection: null,
    events: [],
    on(...params) {
      mock.events.push(['on', ...params]);
    },
    use(...params) {
      mock.events.push(['use', ...params]);
    },
    disconnect(...params) {
      mock.connection.disconnect(...params);
    },
    recreateSocket(...newInitParams) {
      // __DEV__ && console.log('recreateSocket', ...newInitParams);
      if (mock.connection && mock.connection.disconnect) {
        mock.connection.disconnect();
      }
      mock.connection = io(...newInitParams);
      mock.events.forEach((event) => {
        const [name, ...params] = event;
        mock.connection[name](...params);
      });

      mock.connection.recreateSocket = (...newInitParams2) =>
        // __DEV__ && console.log('recreateSocket2', ...newInitParams2);
        mock.recreateSocket(...newInitParams2)
      ;
      // __DEV__ && console.log('recreateConnection');
      return mock.connection;
    },
  };
  return mock.recreateSocket(...initParams);
}

// const DEBUG = __DEV__;

export default class Apiquery {
  static axios = global.axios;
  static qs = qs;
  // io = io

  constructor(params = {}) {
    // console.log('ApiClient', params);
    this.io = ioMock;
    this.log = params.log;
    this.root = params.root;
    this.base = params.base;
    this.headers = params.headers || {};
    this.url = params.url;
    this.wsConfig = params.ws;
    this.wsConnections = {};
    this.authToken = params.authToken || null;
  }

  setAuthToken(authToken) {
    this.authToken = authToken;
    this.wsReconnect();
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

  throwError = async ({ err, res, req }) => {
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
    if (res.json && res.json.err) {
      await throwError({
        ...ctx,
        err: {
          type: 'CUSTOM_ERROR',
          ...res.json.err,
        },
      });
    }
    if (res.status >= 400) {
      const type = 'RES_STATUS_ERROR';
      await throwError({
        ...ctx,
        err: {
          type,
          status: res.status,
          statusText: res.statusText,
          message: `${type}: ${res.status} ${res.statusText}`,
          ...(res.json || {}),
        },
      });
    }
    if (res.textErr) {
      const type = 'TEXT_PARSE_ERROR';
      await ctx.throwError({
        ...ctx,
        res,
        err: {
          type,
          message: 'Ошибка передачи данных',
          err: res.textErr,
        },
      });
    }
    if (res.jsonErr) {
      const type = 'JSON_PARSE_ERROR';
      await ctx.throwError({
        ...ctx,
        res,
        err: {
          type,
          message: 'Ошибка сервера',
          // message: type,
          err: res.jsonErr,
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
      {
        url,
        headers: {
          ...this.headers,
        },
      },
      pick(params, AXIOS_PARAMS),
    );

    const body = params.body || params.data;

    if (!req.headers) req.headers = {};
    if (!req.headers.Accept) req.headers.Accept = 'application/json';
    if (!req.headers['Content-Type']) req.headers['Content-Type'] = 'application/json; charset=utf-8';
    if (req.headers['Content-Type'] === '!') {
      delete req.headers['Content-Type'];
    }

    req._body = body;
    req.body = body;
    if (isPlainObject(body)) {
      if (req.headers['Content-Type'] && req.headers['Content-Type'].includes('application/json')) {
        req.body = JSON.stringify(body);
      } else {
        const form = new FormData();
        Object.keys(body).forEach((key) => {
          form.append(key, body[key]);
        });
        req.body = form;
      }
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
    const { timeout } = params;

    return {
      req,
      timeout,
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

    if (typeof res.result.data === 'object') {
      res.json = res.result.data;
    } else {
      try {
        if (!res.result.data) {
          throw new Error('Empty data');
        }
      } catch (err) {
        res.textErr = err;
      }

      try {
        res.json = JSON.parse(res.result.data);
      } catch (err) {
        res.jsonErr = err;
      }
    }

    return res;
  }

  fetch(...args) {
    const ctx = this.getCtx(...args);
    const { axios } = this.constructor;
    const { req, parseResult, afterFetch } = ctx;

    if (this.log && this.log.trace) {
      this.log.trace('[api]', req.method, req.url, req._body);
      // this.log.trace('[api]', req.method, req.url, req._body, req);
    }

    const { url, ...params } = req;

    const res = axios(req)
      .then(async (response) => {
        ctx.res = await parseResult(ctx, response);
        return ctx;
      })
      .then(afterFetch);
    if (!ctx.timeout) return res;

    return Promise.race([
      res,
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('axios timeout')), ctx.timeout);
      }),
    ]);
  }

  wsReconnect() {
    if (this.log && this.log.trace) {
      this.log.trace('[api] WS.wsReconnect ###', Object.keys(this.wsConnections));
    }

    Object.keys(this.wsConnections).forEach((key) => {
      const [path, options, socket] = this.wsConnections[key];
      // __DEV__ && this.log.trace('[api] prepare reconnect @@', socket);
      // // __DEV__ && console.log('prepare reconnect @@', socket);
      // if (!socket.recreateSocket) {
      //   // __DEV__ && console.log('!socket.recreateSocket', socket);
      // }
      socket.recreateSocket(path, options);
      // socket.disconnect();
      // this.ws(path, options);
    });
  }

  ws(path = '', options = {}) {
    // console.log('api.ws', path)
    const key = path + JSON.stringify(options);
    if (this.wsConnections[key]) return this.wsConnections[key];
    if (!this.wsConfig) {
      console.error('Вы не можете использовать api.ws без сокет конфигов');
      return null;
    }
    const opts = Object.assign({}, this.wsConfig && this.wsConfig.options, options);
    // console.log('WS WS WS',
    //   {
    //     q: this.wsConfig && this.wsConfig.options,
    //     w: options,
    //     e: opts,
    //     r: Object.assign({}, this.wsConfig && this.wsConfig.options, options)
    //   }
    // );
    // console.log(opts.query, opts.query.token, this.authToken);
    if (!(this.wsConfig && this.wsConfig.tokenInCookie)) {
      if (opts.query && !opts.query.token && this.authToken) opts.query.token = this.authToken;
    }
    const params2 = {};
    if (!this.wsConfig.tokenInCookie) {
      if (!params2.qs) {
        params2.qs = {
          ...(opts.query || {}),
        };
      }
      if (params2.qs && !params2.qs.token && this.authToken) params2.qs.token = this.authToken;
    }

    // console.log('WS opts.query, opts.query.token, this.authToken', opts.query, opts.query.token, this.authToken);
    const url = this.createUrl(path, { ...this.wsConfig, ...params2 });
    // console.log('ws url', {wsConfig: this.wsConfig, path, options, url, opts,} );
    if (this.log && this.log.trace) {
      this.log.trace('[api] WS', url, options);
      // this.log.trace('[api]', req.method, req.url, req._body, req);
    }
    let socket = this.io(
      url,
      opts,
    );

    if (Array.isArray(socket)) {
      if ((typeof window !== 'undefined' ? window : global).__DEV__) {
        console.warn('multiple open sockets', socket);
      }
      socket = socket[2];
    }

    this.wsConnections[key] = [path, options, socket];
    socket.on('disconnect', () => {
      delete this.wsConnections[key];
    });

    return socket;
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
