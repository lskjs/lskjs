import forEach from 'lodash/forEach';
import Promise from 'bluebird';
import clone from 'lodash/clone';
import pick from 'lodash/pick';

const Schema = () => { console.error('OVERWRITE ME'); }; // eslint-disable-line no-console

export default class BaseSchema {
  static Schema = Schema;
  _universal = true;
  constructor(schema = {}, { defaultParams: incomeDefaultParams, ...incomeOptions } = {}) {
    const defaultParams = {
      count: false,
      skip: 0,
      limit: 10,
      filter: {},
      // sort: {},
      select: ['_id'],
      // populate: [],
      prepare: null,
      ...incomeDefaultParams,
    };
    const options = {
      timestamps: true,
      ...incomeOptions,
    };
    this.schema = schema;
    this.options = options;
    this.defaultParams = defaultParams;
    this.statics = {
      getParams(incomeParams, systemParams) {
        const params = { ...defaultParams, ...pick(incomeParams, ['filter', 'sort', 'skip', 'limit', 'select']) };
        if (__DEV__ && incomeParams.debug) {
          delete params.select;
        }
        if (params.limit > 100) params.limit = 100;
        return {
          ...params,
          ...systemParams,
        };
      },
      countByParams(incomeParams, systemParams) {
        const params = this.getParams(incomeParams, systemParams);
        return this.countDocuments(params.filter);
      },
      findByParams(incomeParams, systemParams) {
        const params = this.getParams(incomeParams, systemParams);
        let res = this.find(params.filter);
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
      },
      findOneByParams(params = {}) {
        return this.findByParams2({
          ...params,
          method: 'findOne',
        });
      },
      findByParams2(incomeParams) {
        const params = Object.assign({}, this.constructor.defaultParams, incomeParams);
        let res;
        if (params.method === 'findOne') {
          res = this.findOne(params.filter);
        } else {
          res = this.find(params.filter);
        }
        if (params.sort) {
          res = res.sort(params.sort);
        }
        if (params.skip) {
          res = res.skip(params.skip);
        }
        if (params.limit) {
          res = res.limit(params.limit);
        }
        if (params.select) {
          res = res.select(params.select);
        }
        if (params.populate) {
          res = res.populate(params.populate);
        }
        return res;
      },
      async prepareOne(obj) {
        return obj;
      },
      async prepare(obj, params) {
        // console.log('PREPARE params.toObject', params.toObject);
        // console.log('params.toObject2@@@', params.toObject2);
        const toObjectOne = (o) => {
          if (!params.toObject2 || !Object.keys(params.toObject2).length) return o;
          if (o && o.toObject) return (o.toObject(params.toObject2));
          return o;
        };

        let res;
        if (Array.isArray(obj)) {
          res = await Promise.map(obj, o => this.prepareOne(o, params));
        } else {
          res = await this.prepareOne(obj, params);
        }

        if (Array.isArray(res)) {
          return res.map(toObjectOne);
        }
        return toObjectOne(res);
      },
    };
    this.methods = {};
    this.preMethods = {
      async save(next) {
        this.wasNew = this.isNew;
        try {
          if (this.preSave) await this.preSave();
        } catch (err) {
          return next(err);
        }
        return next();
      },
    };
    this.postMethods = {
      async save() {
        if (this.postSave) this.postSave();
      },
    };
    this.indexes = [];
    this.virtuals = [];
  }


  extend(schema, options) {
    const object = new this();
    const fields = ['schema', 'options', 'statics', 'methods', 'preMethods', 'postMethods', 'indexes', 'virtuals'];
    fields.forEach((key) => {
      object[key] = clone(this[key]);
    });
    Object.assign(object.schema, schema);
    Object.assign(object.options, options);
    return object;
  }

  generateMongooseName(name = 'Model') {
    return `${name}_${Date.now()}`;
  }


  getMongooseSchema() {
    const schema = new this.constructor.Schema(this.schema, this.options);
    schema.statics = this.statics;
    schema.methods = this.methods;
    forEach(this.preMethods, (val, key) => {
      schema.pre(key, val);
    });
    forEach(this.postMethods, (val, key) => {
      schema.post(key, val);
    });
    forEach(this.virtuals, ([args1, method, args2]) => {
      // console.log('virtuals', method, args1);
      if (method === 'init') {
        schema.virtual(...args1);
      } else {
        schema.virtual(...args1)[method](...args2);
      }
    });
    forEach(this.indexes, (args) => {
      schema.index(...args);
    });
    schema._uschema = this;
    return schema;
  }

  getMongooseModel(db) {
    if (!db) {
      // console.log('ERROR UniversalSchema.getMongooseModel() !db');
      throw 'ERROR UniversalSchema.getMongooseModel() !db';
      // return null;
    }
    if (!this.options.collection) {
      throw '!this.options.collection';
    }
    return db.model(
      this.options.model || this.generateMongooseName(this.options.collection),
      this.getMongooseSchema(),
      this.options.collection,
    );
  }

  run({ db } = {}) {
    return this.getMongooseModel(db);
  }

  pre(key, val) {
    this.preMethods[key] = val;
    return this;
  }

  post(key, val) {
    this.postMethods[key] = val;
    return this;
  }

  virtual(...args1) {
    if (args1.length > 1) {
      this.virtuals.push([args1, 'init']);
      return this;
    }
    return {
      set: (...args2) => {
        this.virtuals.push([args1, 'set', args2]);
      },
      get: (...args2) => {
        this.virtuals.push([args1, 'get', args2]);
      },
    };
  }
  index(...args) {
    this.indexes.push(args);
    return this;
  }
}
