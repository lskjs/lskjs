import MongooseSchema from '@lskjs/db/MongooseSchema';
import pick from 'lodash/pick';

export default function PermitModel(app) {
  const { db } = app;
  const { Schema } = db;
  const schema = new MongooseSchema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
      },
      type: {
        type: String,
        required: true,
      },
      code: {
        // Код по котором будет искаться в базе
        type: String,
      },
      disabledAt: {
        // Дата когда пермит перестал быть валидным(досрочный expiredAt)
        type: Date,
      },
      activatedAt: {
        // Дата активации
        type: Date,
      },
      expiredAt: {
        // До какого времени годен
        type: Date,
      },
      info: Object, // Всякая кастомная херь
    },
    {
      model: 'Permit',
      collection: 'permit',
    },
  );
  schema.statics.createPermit = async function (data) {
    const { userId, expiredAt, info, code, type } = data;
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
  schema.statics.generateCode = (...args) => this.parent.generateCode(...args);
  schema.statics.generateUniqCode = (...args) => this.parent.generateUniqCode(...args);
  schema.statics.isCode = function ({ code, type, length = 4 }) {
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

  schema.statics.findByCode = async function (code, params = {}) {
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
  schema.statics.activate = async function (code) {
    const permit = await this.findByCode(code);
    if (permit) {
      return permit.activate();
    }
    return null;
  };
  schema.methods.activate = async function () {
    // if (this.activatedAt) throw 'permit.activatedBefore';
    // if (new Date(this.expiredAt) < new Date()) throw 'permit.expired';
    // this.getStatus()
    this.activatedAt = new Date();
    await this.save();
    app.emit(`models.Permit.activated_${this.type}`, this);
    return this;
  };
  schema.methods.getStatus = function ({ date = new Date() } = {}) {
    if (this.activatedAt) return 'activated';
    if (new Date(this.expiredAt) < date) return 'expired';
    return 'valid';
  };
  schema.statics.prepareOne = async function (obj) {
    // eslint-disable-next-line no-param-reassign
    obj.info = pick(obj.info, ['email', 'type']);
    return obj;
  };
  return schema;
}
