// import fetch from 'node-fetch';
// import _ from 'lodash'
export function trim(initialStr, begin = true, end = true, symbol = '/') {
  if (initialStr == null) return initialStr
  let str = initialStr
  if (end && str[str.length - 1] === symbol) {
    str = str.substr(0, str.length - 1)
  }
  if (begin && str[0] === symbol) {
    str = str.substr(1)
  }
  if (str !== initialStr) return trim(str, begin, end, symbol)
  return str
}

export default class ApiClient {
  constructor(params) {
    this.base = trim(params.base, false)
    this.prefix = trim(params.prefix)
    if (params.auth) {
      this.setAuth(params.auth)
    }
  }

  createUrl(path, options = {}) {
    // console.log('createUrl', path);
    const prefix = options.prefix || this.prefix || ''
    if (path.substr(0, 5) === 'http:' || path.substr(0, 6) === 'https:') {
      return path
    }
    let url
    if (path[0] === '/' && !prefix) {
      url = [this.base, path.substr(1)]
    } else if (prefix) {
      url = [this.base, prefix, path]
    } else {
      url = [this.base, path]
    }
    // console.log('url', url);
    return url.join('/')
  }

  setAuthToken(authToken) {
    this.authToken = authToken
  }
  setAuth(authParams) {
    this.setAuthToken(authParams.token)
  }

  authFetch(...args) {
    if (!this.authToken) {
      return Promise.reject('!this.authToken')
    }
    return this.fetch(...args)
  }

  authLogin(data) {
    return this.fetch('auth/login', {
      prefix: '',
      method: 'POST',
      body: data,
    })
  }

  authSignup(data) {
    return this.fetch('auth/signup', {
      method: 'POST',
      body: data,
    })
  }

  authValidate(data) {
    return this.fetch('auth/validate', {
      method: 'GET',
      body: data,
    })
  }

  authRecovery(data) {
    return this.fetch('auth/recovery', {
      method: 'POST',
      body: data,
    })
  }

  getUser(id) {
    return this.fetch(`user/${id}`, {
      method: 'GET',
    })
  }

  onError(err) {
    console.log('pack.err', err)
    throw err
  }

  fetch(path, params = {}) {
    // console.log('fetch', path);
    const options = Object.assign({}, params)
    const url = this.createUrl(path)
    if (typeof options.body !== 'string') {
      options.body = JSON.stringify(options.body)
    }
    if (!options.headers) options.headers = {}
    if (!options.headers['Accept']) options.headers['Accept'] = 'application/json'
    if (!options.headers['Content-Type']) options.headers['Content-Type'] = 'application/json; charset=utf-8'
    if (!options.headers['Authorization'] && this.authToken)
      options.headers['Authorization'] = 'Bearer ' + this.authToken


    return fetch(url, options)
      .then(res => {
        return res.json()
      })
      .then(pack => {
        if (pack.err) {
          return this.onError(pack.err, pack)
        }
        if (pack.code !== 0) {
          return this.onError(pack)
        }
        return pack
      })
  }
}
