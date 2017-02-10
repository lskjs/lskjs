// import _ from 'lodash'
export function allParams() {
  const params = {};
  Object.assign(params, this.params);
  Object.assign(params, this.body);
  Object.assign(params, this.query);


  return params;
}
