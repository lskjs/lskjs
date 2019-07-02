import UniversalSchema from '@lskjs/db/MongooseSchema';
import SHA256 from 'crypto-js/sha256';
import m from 'moment';
import pick from 'lodash/pick';

export default function PermitModel(ctx) {
  const { db } = ctx;
  const { Schema } = db;
  const schema = new UniversalSchema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      required: true,
    },
    code: { // Код по котором будет искаться в базе
      type: String,
    },
    disabledAt: { // Дата когда пермит перестал быть валидным(досрочный expiredAt)
      type: Date,
    },
    activatedAt: { // Дата активации
      type: Date,
    },
    expiredAt: { // До какого времени годен
      type: Date,
    },
    info: Object, // Всякая кастомная херь
  }, {
    model: 'Permit',
    collection: 'permit',
  });
  schema.statics.createPermit = async function (data) { // eslint-disable-line func-names
    const {
      userId, expiredAt, info, code, type,
    } = data;
    const permit = new this({
      type,
      userId,
      expiredAt,
      info,
      code,
    });
    await permit.save();
    if (!permit.code) {
      permit.code = this.generateCode({ type: 'random' });
      await permit.save();
    }
    return permit;
  };
  schema.statics.generateCode = function ({ str, type = 'random', length = 4 }, iteration) { // eslint-disable-line func-names
    if (type === 'random' || type === 'number') {
      const min = 0;
      let maxNumber = '';
      for (let i = 0; i < length; i += 1) {
        maxNumber += '9';
      }
      const max = Number(maxNumber) + 1;
      let value = String(Math.floor(Math.random() * (max - min)) + min);
      while (value.length < length) {
        value = `0${value}`;
      }
      return value;
    } if (type === 'hash') {
      if (iteration) {
        str += Math.floor(Math.random() * 100000);
      }
      return SHA256(str).toString();
    }
    throw '!type';
  };
  schema.statics.isCode = function ({ code, type, length = 4 }) { // eslint-disable-line func-names
    if (type === 'random') {
      if (typeof code === 'string' && code.length === length) {
        let strRegexp = '';
        for (let i = 0; i < length; i += 1) {
          strRegexp = '\\d';
        }
        return code.match(new RegExp(strRegexp));
      }
    }
    return false;
  };
  schema.statics.generateUniqCode = async function ({ criteria, codeParams = {}, iteration = 0 }) { // eslint-disable-line func-names
    // throw '!code';
    if (iteration > 100) throw '!code';
    const code = this.generateCode(codeParams, iteration);
    const permit = await this.findOne({
      ...criteria,
      code,
    })
      .select('_id');
    if (permit) {
      const params = { criteria, codeParams, iteration };
      params.iteration += 1;
      return this.generateUniqCode(params);
    }
    return code;
  };
  schema.statics.findByCode = async function (code, params = {}) { // eslint-disable-line func-names
    return this.findOne({
      code,
      expiredAt: {
        $gte: new Date(),
      },
      activatedAt: {
        $exists: false,
      },
      ...params,
    });
  };
  schema.statics.activate = async function (code) { // eslint-disable-line func-names
    const permit = await this.findByCode(code);
    if (permit) {
      return permit.activate();
    }
    return null;
  };
  schema.statics.makeExpiredAt = function ({ value = 1, type = 'hour' } = {}) { // eslint-disable-line func-names
    return m().add(value, type).toDate();
  };
  schema.methods.activate = async function () { // eslint-disable-line func-names
    this.activatedAt = new Date();
    await this.save();
    ctx.emit(`models.Permit.activated_${this.type}`, this);
    return this;
  };
  schema.statics.prepareOne = async function (obj) { // eslint-disable-line func-names
    obj.info = pick(obj.info, ['email', 'type']);
    return obj;
  };
  return schema;
}
