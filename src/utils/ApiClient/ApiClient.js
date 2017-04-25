// import fetch from 'node-fetch';
import _ from 'lodash';
import io from '../socket-io-universal';
import trim from '../trim';
import qs from 'qs';
import fetch from 'isomorphic-fetch';

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
        return (this.path || '/') + (query ? '?' + query : '');
      },
      merge(params) {
        return this.create({
          ...this.query,
          ...params,
        });
      },
    };
  }

  // onError(err) {
  //   console.log('pack.err', err)
  //   throw err
  // }

  async throwError({ err }) {
    __DEV__ && console.error('throwError', err);
    const message = err && err.message || err;
    throw new Error(_.isPlainObject(message) ? JSON.stringify(message) : message);
  }

  async afterFetch({ json, res, throwError }) {
    if (res.status >= 400) {
      await throwError({
        err: {
          status: res.status,
          statusText: res.statusText,
          data: json,
        },
        res,
      });
    }
    if (json.err) {
      await throwError({
        err: json.err,
        json,
        res,
      });
    }
    return json;
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


  getFetch(url, params = {}) {
    const options = Object.assign({}, params);

    if (options.data && !options.body) {
      options.body = options.data;
    }
    if (_.isPlainObject(options.body)) {
      options.body = JSON.stringify(options.body);
    }
    if (!options.headers) options.headers = {};
    if (!options.headers.Accept) options.headers.Accept = 'application/json';
    if (!options.headers['Content-Type']) options.headers['Content-Type'] = 'application/json; charset=utf-8';
    if (options.headers['Content-Type'] === '!') {
      delete options.headers['Content-Type'];
    }
    if (!options.headers.Authorization && this.authToken) {
      options.headers.Authorization = `Bearer ${this.authToken}`;
    }

    if (options.queryParams || options.qs) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + qs.stringify(options.queryParams || options.qs);
    }

    if (this.log && this.log.trace) {
      this.log.trace('[api]', (options && options.method || 'GET'), this.createUrl(url));
    }
    return fetch(this.createUrl(url), options);
  }

  fetch(...args) {
    const throwError = args[1] && args[1].throwError || this.throwError;
    return this.getFetch(...args)
    .then(async (res) => {
      let text;
      let json;
      try {
        text = await res.text();
        json = JSON.parse(text);
      } catch (e) {
        await throwError({
          err: {
            status: res.status,
            statusText: res.statusText,
            // text: text,
            message: text,
          },
          res,
        });
      }
      const params = {
        url: args[0],
        params: args[1],
        json,
        text,
        res,
        throwError,
      };
      if (args[1] && args[1].afterFetch) {
        return args[1].afterFetch(params);
      }
      return this.afterFetch(params);
    });
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
