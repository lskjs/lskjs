import map from 'lodash/map';

export default (params = {}) => map(params, (val, key) => ([key, val].join('='))).join('&');
