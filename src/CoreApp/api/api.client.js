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


export default class ApiClient {
  constructor(params) {
    this.base = trim(params.base, false);
    this.prefix = trim(params.prefix);
    if (params.auth) {
      this.setAuth(params.auth);
    }
  }


  setAuthToken(authToken) {
    this.authToken = authToken;
  }
  setAuth(authParams) {
    this.authParams = authParams;
    if (this.authParams.token) {
      this.authToken = this.authParams.token;
    }
  }

  authFetch(...args) {
    if (!this.authToken) {
      return Promise.reject('!this.authToken');
    }
    return this.fetch(...args);
  }

  authLogin(data) {
    return this.fetch('auth/login', {
      method: 'POST',
      body: data,
    });
  }

  authSignup(data) {
    return this.fetch('auth/signup', {
      method: 'POST',
      body: data,
    });
  }

  authValidate(data) {
    return this.fetch('auth/validate', {
      method: 'GET',
      body: data,
    });
  }

  authRecovery(data) {
    return this.fetch('auth/recovery', {
      method: 'POST',
      body: data,
    });
  }

  getUser(id) {
    return this.fetch(`user/${id}`, {
      method: 'GET',
    });
  }

  // onError(err) {
  //   console.log('pack.err', err)
  //   throw err
  // }

  async throwError({ err }) {
    console.log('throwError', err);
    const message = err && err.message || err;
    throw new Error(_.isPlainObject(message) ? JSON.stringify(message) : message);
  }

  async afterFetch({ json, res }) {
    if (res.status >= 400) {
      await this.throwError({
        err: {
          status: res.status,
          statusText: res.statusText,
          data: json,
        },
        res,
      });
    }
    if (json.err) {
      await this.throwError({
        err: json.err,
        json,
        res,
      });
    }
    return json;
  }
  createUrl(path, options = {}) {
    // console.log('createUrl', path);
    const prefix = options.prefix || this.prefix || '';
    if (path.substr(0, 5) === 'http:' || path.substr(0, 6) === 'https:') {
      return path;
    }
    let url;
    if (path[0] === '/' && !prefix) {
      url = [this.base, path.substr(1)];
    } else if (prefix) {
      url = [this.base, prefix, path];
    } else {
      url = [this.base, path];
    }
    // console.log('url', url);
    return url.join('/');
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
    return this.getFetch(...args)
      .then(async (res) => {
        let text;
        let json;
        try {
          text = await res.text();
          json = JSON.parse(text);
        } catch (e) {
          await this.throwError({
            err: {
              status: res.status,
              statusText: res.statusText,
              // text: text,
              message: text,
            },
            res,
          });
        }
        return this.afterFetch({
          json,
          text,
          res,
        });
      });
  }
}
