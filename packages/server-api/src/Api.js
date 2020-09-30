import Promise from 'bluebird';
import hash from 'object-hash';
import Cacheman from 'cacheman';
import get from 'lodash/get';
import pick from 'lodash/pick';
import isArray from 'lodash/isArray';
import set from 'lodash/set';
import forEach from 'lodash/forEach';
import tryJSONparse from '@lskjs/utils/tryJSONparse';
import assignProps from '@lskjs/utils/assignProps';
import autobind from '@lskjs/utils/autobind';
import mapValues from 'lodash/mapValues';
import map from 'lodash/map';
import some from 'lodash/some';
import getDocsTemplate from './getDocsTemplate';

export default class Api {
  constructor(props, params) {
    assignProps(this, props);
    if (!this.app) throw 'Api !app';
    this.asyncRouter = this.app.asyncRouter;
    this.cacheStore = new Cacheman('api', {
      ttl: 60,
    });
    assignProps(this, params);
  }
  e(...args) {
    return this.app.e(...args);
  }

  @autobind
  e404(req) {
    throw this.app.e('E_404', {
      status: 404,
      message: `Not found path ${req.path}`,
      path: req.path,
      level: 'warn',
    });
  }
  isAuth(req) {
    if (req._errJwt) throw req._errJwt;
    if (!req.user || !req.user._id) throw this.errors.e401('!req.user');
    return true;
  }
  async useMiddleware(middleware, req, res) {
    return new Promise((resolve, reject) => {
      return middleware(req, res, async err => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }
  async validateParams(data, fields) {
    const errors = map(fields, (validator, param) => {
      if (validator && validator.required && data[param] == null) {
        return {
          name: 'api.validateParams.required',
          param,
        };
      }
      return undefined;
    }).filter(Boolean);

    if (some(errors, Boolean)) {
      throw this.e({
        code: 'api.validateParams',
        status: 400,
        data: {
          errors,
        },
      });
    }

    return mapValues(fields, (validator, param) => {
      const aliases = [param, ...(validator.alias || [])];
      // eslint-disable-next-line no-restricted-syntax
      for (const param2 of aliases) {
        if (data[param2] != null) return data[param2];
      }
      return null;
    });
  }

  getListParams(req) {
    const { data } = req;
    const params = mapValues(pick(data, ['filter', 'sort', 'skip', 'limit', 'select', 'view', 'operation']), a =>
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
        .map(a => a.trim());
    }
    if (!isArray(params.select)) throw 'select not array';
    if (!params.view) params.view = 'default';
    // params.operation = req.data.operation;

    return params;
  }

  url(path, params) {
    return this.app.url((this.path || '/api') + path, params);
  }
  getGteLte(item) {
    const $gte = get(item, '[0]');
    const $lte = get(item, '[1]');
    const res = {};
    if ($lte !== null && typeof $lte !== 'undefined') {
      res.$lte = $lte;
    }
    if ($gte !== null && typeof $gte !== 'undefined') {
      res.$gte = $gte;
    }
    if (!Object.keys(res).length) return null;
    return res;
  }
  getRoutes() {
    return {
      '*': () => ({ ok: true, message: 'Api.getRoutes is empty' }),
    };
  }
  isAdmin(req) {
    // return true;
    if (get(req, 'user.role') !== 'admin') throw this.e(403, '!admin');
  }
  assign(model, params, fields = []) {
    if (fields.length === 0) {
      console.error('Api.assign empty fields'); // eslint-disable-line no-console
      return;
    }
    fields.forEach(field => {
      if (params[field] === undefined) return;
      model[field] = params[field]; // eslint-disable-line no-param-reassign
      if (!model.markModified) return;
      model.markModified(field);
    });
  }
  // isAdmin(req) {
  //   if (req.user?.role !== 'admin') throw this.e(403, '!admin');
  //   // return req.user?.role === 'admin';
  // }
  equal(objectId1, objectId2) {
    return String(objectId1) === String(objectId2);
  }
  findAndCountByParams(Model, params, params2) {
    const { then = a => a } = params2; //  = a => a
    return Promise.props({
      __pack: 1,
      count: params.count || params.count === '' ? Model.countByParams(params) : undefined,
      data: Model.prepare(then(Model.findByParams(params, params2)), params2),
    });
  }
  withSearchParams(data, field) {
    const { search, filter = {}, ...other } = data;
    if (!search) return data;
    return {
      ...other,
      filter: {
        ...filter,
        $and: [
          {
            [field]: {
              $regex: search,
              $options: 'i',
            },
          },
        ],
      },
    };
  }
  enableCache = false;
  async cache(key, ...args) {
    const [fn, params = { ttl: 60 }] = args.reverse();
    if (!this.enableCache) return fn();
    const { ttl } = params;
    let hashedKey;
    try {
      hashedKey = hash(key);
    } catch (err) {
      try {
        hashedKey = hash(JSON.stringify(key));
      } catch (err2) {
        console.error('Api.cache', err2);  //eslint-disable-line
        hashedKey = '!!!ERR!!!';
      }
    }
    const value = await this.cacheStore.get(hashedKey);
    if (value) return value;
    const res = await fn();
    this.cacheStore.set(hashedKey, res, ttl);
    return res;
  }

  getDocsRoutes({ path, ...props } = {}) {
    const params = {
      name: get(this, 'app.config.about.title'),
      description: get(this, 'app.config.about.description'),
      docs: path ? this.app.url(`${path}/docs`) : this.url('/docs'),
      docsJson: path ? this.app.url(`${path}/docs.json`) : this.url('/docs.json'),
      path,
      ...props,
    };
    return {
      '': () => params,
      '/docs': (req, res) => res.send(getDocsTemplate(params)),
      '/docs.json': (req, res) => res.json(this.getDocs(this, params)),
    };
  }
}
