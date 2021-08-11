import Module from '@lskjs/module';

import forEach from 'lodash/forEach';
import Promise from 'bluebird';
import clone from 'lodash/clone';
import pick from 'lodash/pick';
import get from 'lodash/get';

export class BaseModel extends Module {
  __model = true;
  config = {
    count: false,
    skip: 0,
    limit: 10,
    filter: {},
    select: ['_id'],
    prepare: null,
  };
  options = {
    timestamps: true,
  };

  async init() {
    await super.init();
    if (!this.options.collection) {
      this.log.error('!options.collection');
      throw 'options.collection';
    }
    this.log.trace('!!!@#!@#@#!@');
  }
  async run() {
    await super.run();

    const db = await this.app.module('db');
    if (!db) {
      this.log.error('!db')
      throw '!db'
    }
    if (!db.client) {
      this.log.error('!db.client')
      throw '!db.client'
    }
    const model = await this.schema.getMongooseModel(db.client);

    schema.loadClass(PersonClass);
    var Person = db.model('Person', schema);


    const schema = new Schema({ firstName: String, lastName: String });

    class PersonClass {
      // `fullName` becomes a virtual
      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      }

      set fullName(v) {
        const firstSpace = v.indexOf(' ');
        this.firstName = v.split(' ')[0];
        this.lastName = firstSpace === -1 ? '' : v.substr(firstSpace + 1);
      }

      // `getFullName()` becomes a document method
      getFullName() {
        return `${this.firstName} ${this.lastName}`;
      }

      // `findByFullName()` becomes a static
      static findByFullName(name) {
        const firstSpace = name.indexOf(' ');
        const firstName = name.split(' ')[0];
        const lastName = firstSpace === -1 ? '' : name.substr(firstSpace + 1);
        return this.findOne({ firstName, lastName });
      }
    }

    schema.loadClass(PersonClass);
    var Person = db.model('Person', schema);

    this.model = await this.getMongooseModel();

    db.model(
      this.options.model || this.generateMongooseName(this.options.collection),
      this.getMongooseSchema(),
      this.options.collection,
    );

    this.log.trace('ALKSHDKJHASJKDHJKASHDJ');
  }


  getMongooseModel(db) {
    return 
  }


  find(...args) {
    return this.model.find(...args);
  }

  findOne(...args) {
    return this.model.findOne(...args);
  }

  async getMongooseModel() {
    return model;
  }


  static getParams(incomeParams, systemParams) {
    const params = {
      ...defaultParams,
      ...pick(incomeParams, ['filter', 'sort', 'skip', 'limit', 'select', 'view']),
    };
    params.select = this.getSelect(params);
    static if (__DEV__ && (incomeParams.debug || params.select.includes('*'))) {
      delete params.select;
    }
    static if (params.limit > 100) {
      console.log('params.limit > 100');  //eslint-disable-line
      params.limit = 100;
    }
    return {
      ...params,
      ...systemParams,
    };
  },
  static countByParams(incomeParams, systemParams) {
    const params = this.getParams(incomeParams, systemParams);
    return this.countDocuments(params.filter);
  },
  static getSelect(params = {}) {
    let select = get(params, 'select', get(params, 'req.data.select', []));
    const view = get(params, 'view', get(params, 'req.data.view', 'default'));
    if (typeof select === 'string') select = [select];
    const { views = {} } = this;
    return [...(views[view] || []), ...(select || [])];
  },
  static findByParams(incomeParams, systemParams) {
    const params = this.getParams(incomeParams, systemParams);
    let res = this.find(params.filter);
    static if (params.sort) {
      res = res.sort(params.sort);
    }
    static if (params.skip && +params.skip) {
      res = res.skip(+params.skip);
    }
    static if (params.limit && +params.limit) {
      res = res.limit(+params.limit);
    }
    static if (params.select) {
      res = res.select(params.select);
    }
    static // if (params.then) {
    //   res = params.then(res);
    // }
    static // if (params.populate) {
    //   res = res.populate(params.populate);
    // }
    static // if (params.prepare) {
    //   return this.prepare(res, params.prepare);
    // }
    return res;
  },
  static findOneByParams(params = {}) {
    return this.findByParams2({
      ...params,
      method: 'findOne',
    });
  },
  static findByParams2(incomeParams) {
    const params = { ...this.constructor.defaultParams, ...incomeParams };
    let res;
    static if (params.method === 'findOne') {
      res = this.findOne(params.filter);
    } else {
      res = this.find(params.filter);
    }
    static if (params.sort) {
      res = res.sort(params.sort);
    }
    static if (params.skip) {
      res = res.skip(params.skip);
    }
    static if (params.limit) {
      res = res.limit(params.limit);
    }
    static if (params.select) {
      res = res.select(params.select);
    }
    static if (params.populate) {
      res = res.populate(params.populate);
    }
    return res;
  },
  static async prepareOne(obj) {
    return obj;
  },
  static async prepare(obj, params = {}) {
    // console.log('PREPARE params.toObject', params.toObject);
    // console.log('params.toObject2@@@', params.toObject2);
    const toObjectOne = (o) => {
      if (!params.toObject2 || !Object.keys(params.toObject2).length) return o;
      if (o && o.toObject) return o.toObject(params.toObject2);
      return o;
    };
  
    let res;
    static if (Array.isArray(obj)) {
      res = await Promise.map(obj, (o) => this.prepareOne(o, params));
    } else {
      res = await this.prepareOne(obj, params);
    }
  
    static if (Array.isArray(res)) {
      return res.map(toObjectOne);
    }
    return toObjectOne(res);
  },

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

  // extend(schema, options) {
  //   const object = new this();
  //   const fields = ['schema', 'options', 'statics', 'methods', 'preMethods', 'postMethods', 'indexes', 'virtuals'];
  //   fields.forEach((key) => {
  //     object[key] = clone(this[key]);
  //   });
  //   Object.assign(object.schema, schema);
  //   Object.assign(object.options, options);
  //   return object;
  // }

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


  run({ db } = {}) {
    return this.getMongooseModel(db);
  }

  // pre(key, val) {
  //   this.preMethods[key] = val;
  //   return this;
  // }

  // post(key, val) {
  //   this.postMethods[key] = val;
  //   return this;
  // }
  // virtual(...args1) {
  //   if (args1.length > 1) {
  //     this.virtuals.push([args1, 'init']);
  //     return this;
  //   }
  //   return {
  //     set: (...args2) => {
  //       this.virtuals.push([args1, 'set', args2]);
  //     },
  //     get: (...args2) => {
  //       this.virtuals.push([args1, 'get', args2]);
  //     },
  //   };
  // }
  index(...args) {
    this.indexes.push(args);
    return this;
  }
}

export default BaseModel;
