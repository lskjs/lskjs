import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import tryJSONparse from '@lskjs/utils/tryJSONparse';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import set from 'lodash/set';

import BaseApi from './Api';

export default class ListApi extends BaseApi {
  getRoutes() {
    return {
      ...super.getRoutes(),
      '/count': this.count.bind(this),
      '/find': this.find.bind(this),
      '/list': this.find.bind(this),
      '/findOne': this.findOne.bind(this),
      '/get': this.findOne.bind(this),
      '/create': this.create.bind(this),
      '/update': this.update.bind(this),
      '/edit': this.update.bind(this),
      '/remove': this.remove.bind(this),
      '/delete': this.remove.bind(this),
    };
  }

  cache(key, cb) {
    return cb();
  }
  getListParams(req) {
    const { data } = req;
    const params = mapValues(pick(data, ['filter', 'sort', 'skip', 'limit', 'select', 'view', 'operation']), (a) =>
      tryJSONparse(a),
    );

    if (!params.filter) params.filter = {};
    if (req.data) {
      forEach(req.data, (val, key) => {
        if (key.substr(0, 'filter.'.length) === 'filter.') {
          set(params, key, val);
        }
        if (key.substr(0, 'sort.'.length) === 'sort.') {
          set(params, key, val);
        }
      });
    }
    if (params.limit > 100) params.limit = 100;
    if (!params.select) params.select = [];
    if (typeof params.select === 'string') {
      params.select = params.select
        .trim()
        .split(',')
        .map((a) => a.trim());
    }
    if (!Array.isArray(params.select)) throw 'select not array';
    if (!params.view) params.view = 'default';
    // params.operation = req.data.operation;

    return params;
  }

  countByParams(Model, incomeParams = {}, systemParams = {}) {
    const params = this.__getParams(Model, incomeParams, systemParams);
    return Model.countDocuments(params.filter);
  }
  __getSelect(Model, params = {}) {
    let select = get(params, 'select', get(params, 'req.data.select', []));
    const view = get(params, 'view', get(params, 'req.data.view', 'default'));
    if (typeof select === 'string') select = [select];
    const { views = {} } = Model;
    return [...(views[view] || []), ...(select || [])];
  }
  __getParams(Model, incomeParams = {}, systemParams = {}) {
    const params = {
      ...(Model.defaultParams || {}),
      ...pick(incomeParams, ['filter', 'sort', 'skip', 'limit', 'select', 'view']),
    };
    params.select = this.__getSelect(params);
    if (isDev && (incomeParams.debug || params.select.includes('*'))) {
      delete params.select;
    }
    if (params.limit > 100) {
      console.log('params.limit > 100');  //eslint-disable-line
      params.limit = 100;
    }
    return {
      ...params,
      ...systemParams,
    };
  }
  findByParams(Model, incomeParams = {}, systemParams = {}) {
    const params = this.__getParams(Model, incomeParams, systemParams);
    let res = Model.find(params.filter);
    if (params.sort) {
      res = res.sort(params.sort);
    }
    if (params.skip && +params.skip) {
      res = res.skip(+params.skip);
    }
    if (params.limit && +params.limit) {
      res = res.limit(+params.limit);
    }
    if (params.select) {
      res = res.select(params.select);
    }
    // if (params.then) {
    //   res = params.then(res);
    // }
    // if (params.populate) {
    //   res = res.populate(params.populate);
    // }
    // if (params.prepare) {
    //   return this.prepare(res, params.prepare);
    // }
    return res;
  }

  async count() {
    throw new Err('api.notImplemented', { status: 500 });
  }
  async find() {
    throw new Err('api.notImplemented', { status: 500 });
  }
  async findOne() {
    throw new Err('api.notImplemented', { status: 500 });
  }
  async create() {
    throw new Err('api.notImplemented', { status: 500 });
  }
  async update() {
    throw new Err('api.notImplemented', { status: 500 });
  }
  async remove() {
    throw new Err('api.notImplemented', { status: 500 });
  }
}
