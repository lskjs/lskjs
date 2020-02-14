import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';
import MongooseSchema from '@lskjs/db/MongooseSchema';
import canonizeUsername from '@lskjs/utils/canonizeUsername';

export default function getSchema(ctx) {
  const mongoose = ctx.db;
  const schema = new MongooseSchema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
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
    },
    {
      model: 'Passport',
      collection: 'passport',
      // timestamps: true,
      // toJSON: { virtuals: true },
      // toObject: { virtuals: true },
    },
  );

  schema.methods.generateUsername = async function a(collection) {
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

    throw 'cant generate unique username';
  };
  schema.methods.getUser = async function a() {
    return ctx.models.User.findById(this.userId);
  };

  schema.methods.getIdentity = function a(params = {}) {
    const object = pick(this.toObject(), ['_id']);
    return Object.assign(object, params);
  };

  schema.methods.generateToken = function a(params) {
    return jwt.sign(this.getIdentity(params), ctx.config.jwt.secret);
  };

  schema.statics.decodeToken = function a(token) {
    return jwt.verify(token, ctx.config.jwt.secret);
  };

  schema.statics.getByToken = async function a(token) {
    const { _id } = this.decodeToken(token);
    return this.findById(_id);
  };

  return schema;
}
