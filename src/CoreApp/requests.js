// import _ from 'lodash'
export function allParams() {
  const params = {}
  Object.assign(params, this.params)
  Object.assign(params, this.body)
  Object.assign(params, this.query)
  return params
}
export function getToken() {
  const req = this
  // function fromHeaderOrQuerystring (req) {
  if ( req.headers.authorization && req.headers.authorization.split( ' ' )[ 0 ] === 'Bearer' ) {
    return req.headers.authorization.split( ' ' )[ 1 ]
  } else if ( req.query && req.query.token ) {
    return req.query.token
  }
  if (__DEV__) return ctx.config.jwt && ctx.config.jwt.devToken
  return null
    // if (__DEV__) return ctx.config.jwt.devToken
    // return null;
  // }

  return this.query.token
  // headers //?
  const params = {}
  Object.assign(params, this.params)
  Object.assign(params, this.body)
  Object.assign(params, this.query)
  return params
}
