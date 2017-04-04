// import fetch from 'node-fetch';
import _ from 'lodash';
export function trim(initialStr, begin = true, end = true, symbol = '/') {
  if (initialStr == null) return initialStr;
  let str = initialStr;
  if (end && str[str.length - 1] === symbol) {
    str = str.substr(0, str.length - 1);
  }
  if (begin && str[0] === symbol) {
    str = str.substr(1);
  }
  if (str !== initialStr) return trim(str, begin, end, symbol);
  return str;
}


function queryParams(params) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}


// new ApiClientBase({
//   base: '/api/v1',
// })

export default class ApiClient {
  constructor(params) {
    this.base = trim(params.base, false);
    this.authToken = params.authToken || null;
  }

  setAuthToken(authToken) {
    this.authToken = authToken;
  }

  ws() {
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
    // console.log('createUrl', path);
    if (path.substr(0, 5) === 'http:' || path.substr(0, 6) === 'https:') {
      return path;
    }
    let url;
    if (path[0] === '/') {
      url = [this.url, path.substr(1)];
    } else {
      url = [this.url, this.base, path];
    }
    // console.log('url', url);
    return url.map(a => a).join('/');
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
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams || options.qs);
    }

    return fetch(this.createUrl(url), options);
  }

  fetch(...args) {
    const throwError = args[1].throwError || this.throwError;
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


  ws(path, options) {

  }
}
