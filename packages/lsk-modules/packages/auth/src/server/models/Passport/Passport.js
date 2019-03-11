import MongooseSchema from '@lskjs/db/MongooseSchema';
import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';

export function getSchema(ctx, module) {
  const mongoose = ctx.db;
  const schema = new MongooseSchema({
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
    providerId: { // link to social network
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
  }, {
    collection: 'passport',
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

  schema.methods.generateUsername = async function a(collection) {
    const { User } = ctx.models;
    let username = `${this.providerId}_${this.provider}`;
    username = module.canonizeUsername(username.toLowerCase());
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


  schema.methods.getStrategy = function a() {
    const strategy = module._strategies[this.provider];
    return strategy;
  };

  schema.methods.updateToken = async function a(...args) {
    const strategy = this.getStrategy();
    if (!strategy) {
      console.error('passport.updateToken: !strategy');
      return;
    }
    await strategy.updateTokens(this, ...args);
  };

  schema.methods.updateData = async function a() {
    const strategy = this.getStrategy();
    if (!strategy) return;
    await strategy.updateTokens(this);
    await strategy.updatePassport({
      passport: this,
    });
  };
  // schema.methods.updateToken = async function () {
  //   const strategy = this.getStrategy()
  //   if (!strategy) return null;
  //   const tokens = await strategy.updateToken(this);
  //   // console.log('schema.methods.updateToken ', tokens);
  //   // this
  //   //
  //   return strategy.updatePassport({
  //     accessToken: tokens.accessToken || this.token,
  //     refreshToken: this.refreshToken,
  //     // refreshToken: accessToken.refreshToken,
  //     passport: this,
  //   })
  // };

  return schema;
}
// export default getSchema;
//
export default(ctx, module) => {
  return getSchema(ctx, module).getMongooseModel(ctx.db);
};
