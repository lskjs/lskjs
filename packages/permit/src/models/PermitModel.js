import Model from '@lskjs/db/Model';
import pick from 'lodash/pick';

export class PermitModel extends Model {
  static schema = {
    userId: {
      type: Model.Types.ObjectId,
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
  };
  static options = {
    model: 'Permit',
    collection: 'permit',
  };
  static async createPermit(data) {
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
  }
  static generateCode(...args) {
    return this.parent.generateCode(...args);
  }
  static generateUniqCode = (...args) => this.parent.generateUniqCode(...args);
  static isCode = function ({ code, type, length = 4 }) {
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

  static findByCode = async function (code, params = {}) {
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
  static activate = async function (code) {
    const permit = await this.findByCode(code);
    if (permit) {
      return permit.activate();
    }
    return null;
  };
  async activate() {
    const { app } = this.constructor; // TODO: HOW?
    // if (this.activatedAt) throw 'permit.activatedBefore';
    // if (new Date(this.expiredAt) < new Date()) throw 'permit.expired';
    // this.getStatus()
    this.activatedAt = new Date();
    await this.save();
    app.emit(`models.Permit.activated_${this.type}`, this);
    return this;
  }
  getStatus({ date = new Date() } = {}) {
    if (this.activatedAt) return 'activated';
    if (new Date(this.expiredAt) < date) return 'expired';
    return 'valid';
  }
  static async prepareOne(obj) {
    return pick(obj, ['_id', 'userId', 'type', 'createdAt', 'expiredAt', 'info']);
  }
}

export default PermitModel;
