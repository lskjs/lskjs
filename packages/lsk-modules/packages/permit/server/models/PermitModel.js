import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';
import SHA256 from 'crypto-js/sha256';
import m from 'moment';
import pick from 'lodash/pick';

export default app => {
  const mongoose = ctx.db;
  const Permit = new UniversalSchema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
    collection: 'permits',
  });
  Permit.statics.createPermit = async function (data) {
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
  Permit.statics.generateCode = function ({ str, type = 'random', length = 4 }, iteration) {
    if (type === 'random') {
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
    } else if (type === 'hash') {
      if (iteration) {
        str += Math.floor(Math.random() * 100000);
      }
      return SHA256(str).toString();
    }
    throw '!type';
  };
  Permit.statics.isCode = function ({ code, type, length = 4 }) {
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
  Permit.statics.generateUniqCode = async function ({ criteria, codeParams = {}, iteration = 0 }) {
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
  Permit.statics.findByCode = async function (code, params = {}) {
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
  Permit.statics.activate = async function (code) {
    const permit = await this.findByCode(code);
    if (permit) {
      return permit.activate();
    }
    return null;
  };
  Permit.statics.makeExpiredAt = function ({ value = 1, type = 'hour' } = {}) {
    return m().add(value, type).toDate();
  };
  Permit.methods.activate = async function () {
    this.activatedAt = new Date();
    await this.save();
    ctx.emit(`models.Permit.activated_${this.type}`, this);
    return this;
  };
  Permit.statics.prepareOne = async function (obj) {
    obj.info = pick(obj.info, ['email', 'type']);
    return obj;
  };
  return Permit;
}
