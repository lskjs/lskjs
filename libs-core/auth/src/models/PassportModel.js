import Model from '@lskjs/db/Model';
import Err from '@lskjs/err';
import canonizeUsername from '@lskjs/utils/canonizeUsername';
import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';

export class PassportModel extends Model {
  static schema = {
    userId: {
      type: Model.Types.ObjectId,
      // ref: 'User',
    },
    // Сырые данные которые пришли из соц сети
    raw: {
      type: Object,
      default: {},
    },
    // Обработанные данные из соцсети
    profile: {
      type: Object, // по идее тут должна быть структура данных
      default: {},
    },
    meta: {
      type: Object,
    },
    // Дата последнего обновления данных
    fetchedAt: {
      type: Date,
      default: null,
    },

    // тип провадера
    type: {
      type: String,
    },
    // название соцсети из passport
    provider: {
      type: String,
      required: true,
    },
    // ID из соцсети
    providerId: {
      // link to social network
      type: String,
      required: true,
    },
    // token из соцсети
    token: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    lastError: {
      type: Object,
    },
    lastErrorAt: {
      type: Date,
    },
    // статус пасспорта: валиден или нет
    // пока не используется
    status: {
      type: String,
      enum: [null, 'valid', 'invalid', 'removed', 'expired', 'unauthorized'],
      default: null,
    },
  };
  static options = {
    model: 'PassportModel',
    collection: 'passport',
    // timestamps: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  };

  async generateUsername(collection) {
    // const { User: UserModel } = ctx.models;
    let username = `${this.providerId}_${this.provider}`;
    username = canonizeUsername(username.toLowerCase());
    if (!collection) return username;
    if (!(await collection.count({ username }))) return username;
    const prefixusername = `${username}_`;

    // TODO!!!!!! убрать хуев китайский стайл цикл
    username = prefixusername + (Math.random() % 100);
    if (!(await collection.count({ username }))) return username;

    username = prefixusername + (Math.random() % 100);
    if (!(await collection.count({ username }))) return username;

    throw new Err('cant generate unique username');
  }
  async getUser() {
    const UserModel = await this.constructor.module('models.UserModel');
    return UserModel.findById(this.userId);
  }

  getIdentity(params = {}) {
    const object = pick(this.toObject(), ['_id']);
    return Object.assign(object, params);
  }

  generateToken(params) {
    return jwt.sign(this.getIdentity(params), ctx.config.jwt.secret);
  }

  static decodeToken(token) {
    return jwt.verify(token, ctx.config.jwt.secret);
  }

  static async getByToken(token) {
    const { _id } = this.decodeToken(token);
    return this.findById(_id);
  }
}

export default PassportModel;
