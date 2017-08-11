import _ from 'lodash';
import get from 'lodash/get';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';
const bcryptGenSalt = Promise.promisify(bcrypt.genSalt);
const bcryptHash = Promise.promisify(bcrypt.hash);
const bcryptCompare = Promise.promisify(bcrypt.compare);

const SALT_WORK_FACTOR = 10;
async function hashPassword(password) {
  const salt = await bcryptGenSalt(SALT_WORK_FACTOR);
  return await bcryptHash(password, salt);
}

const sample2 = {
  avatar: '/assets/no-avatar.png',
  fullName: 'Счастливый Пользователь',
};

function fullName(profile) {
  if (!profile || !_.isPlainObject(profile)) return null;
  let fullname;
  if (profile.middleName) {
    fullname = [profile.lastName, profile.firstName, profile.middleName];
  } else {
    fullname = [profile.firstName, profile.lastName];
  }
  return fullname.filter(a => a).join(' ');
}


export function getSchema(ctx, module) {
  const sample = get(module, 'config.sample', sample2);
  const schema = new UniversalSchema({
    username: {
      type: String,
      // required: true,
      index: { unique: true },
      tolowercase: true,
      trim: true,
    },
    email: {
      type: String,
      index: {
        unique: true,
        sparse: true,
      },
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    role: {
      type: String,
    },
    meta: {
      type: {},
      default: {},
    },
    profile: {
      type: {},
      default: {},
    },
    private: {
      type: {},
      default: {},
    },
    visitedAt: {
      type: Date,
      default: Date.now,
    },
  }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    model: 'User',
    collection: 'user',
    timestamps: true,
  });


  schema.statics.isValidEmail = function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  schema.statics.generatePassword = function (length = 10) {
    return Math.random().toString(36).substr(2, length);
  };
  schema.methods.toJSON = function () {
    const objs = _.omit(this.toObject(), ['password', 'private']);

    const visitedAt = module.online.visitedAt[this._id];
    if (visitedAt) {
      objs.visitedAt = visitedAt;
    }

    return objs;
  };
  schema.methods.getIdentity = function (params = {}) {
    const object = _.pick(this.toObject(), ['_id', 'username', 'name', 'avatar', 'role']);
    return Object.assign(object, params);
  };
  schema.methods.generateAuthToken = function (params) {
    return jwt.sign(this.getIdentity(params), ctx.config.jwt.secret);
  };
  schema.methods.verifyPassword = async function (password) {
    return await bcryptCompare(password, this.password);
  };
  schema.methods.getEmail = function () {
    return this.email || this.toJSON().email;// || this.username || this.toJSON().username;
  };

  const { e400, e500 } = ctx.errors;


  schema.methods.preSave = async function () {
    // console.log('User.methods.preSave', this.isNew, this.wasNew);
    this.wasNew = this.wasNew || this.isNew;
    if (this.isModified('password')) {
      this.password = await hashPassword(this.password);
    }
    if (this.isModified('profile')) {
      this.name = fullName(this.profile) || sample.fullName;
    }
  };
  schema.pre('save', async function (next) {
    // console.log('schema.pre(save', this.isNew);
    await this.preSave();
    next();
  });


  schema.methods.postSave = async function () {
    // console.log('User.methods.postSave', this.wasNew);
  };
  schema.post('save', async function () {
    // console.log('schema.post(save', this.wasNew);
    await this.postSave();
    // next();
  });

  schema.methods.toJSON = function () {
    const user = this.toObject();
    return _.omit(user, ['private', 'password']);
  };

  schema.methods.genereateEmailApprovedLink = async function () {
    const token = jwt.sign({
      userId: this._id.toString(),
      email: this.email,
    }, ctx.config.jwt.secret);
    if (!this.private) this.private = {};
    this.private.approvedEmailToken = token;
    this.markModified('private');
    // ctx.getUrl()
    return `${ctx.config.url}/api/module/auth/email/approve?t=${token}`; // TODO: сделать по умному
  };

  schema.methods.updateFromPassport = async function (passport) {
    // console.log('""""schema.methods.updateFromPassport""""');
    return null;
  };

  // console.log('UUU*U*U*U*U*U*U**U*UU(U(U(U(U(U');
  schema.statics.updateFromPassport = async function (passport) {
    // console.log('"""schema.statics.updateFromPassport"""', passport.userId);
    if (!passport.userId) return null;
    const user = await this.findById(passport.userId);
    // console.log({user});
    if (!user) return null;
    // console.log('ser.updateFromPassport', user.updateFromPassport);
    if (!user.updateFromPassport) return null;
    await user.updateFromPassport(passport);
    return user.save();
  };

  schema.statics.findAndApproveEmail = async function (token) {
    const { checkNotFound } = ctx.helpers;
    const decode = jwt.verify(token, ctx.config.jwt.secret);
    const { email, userId } = decode;
    if (!decode) throw e500('jsonwebtoken error');
    if (!decode.userId) throw e400('!decode.userId');
    if (!decode.email) throw e400('!decode.email');
    const user = await this
    .findById(userId)
    .then(checkNotFound);
    if (user.email !== email) throw e400('user.email !== email');
    if (!user.private) user.private = {};
    // console.log(user.private.approvedEmailToken);
    // console.log('=================================');
    // console.log(token);
    if (user.private.approvedEmailToken !== token) throw e400('wrong token');
    user.private.approvedEmailDate = new Date();
    user.meta.approvedEmail = true;
    user.private.approvedEmailToken = null;
    user.markModified('private');
    user.markModified('meta');
    // console.log(user);
    return user.save();
  };

  // schema.methods.updateSocialData = async function () {
  //   const { Passport } = module.models;
  //   const passport = await Passport.findOne({
  //     provider: 'youtube',
  //     user: this._id,
  //   });
  //   if (passport) {
  //     return passport.updateUser();
  //   }
  //   return null;
  // };
  //
  // schema.methods.getSocialData = async function (provider) {
  //   const { Passport } = module.models;
  //   const params = {
  //     user: this._id,
  //   };
  //   if (provider) params.provider = provider;
  //   const passport = await Passport.findOne(params);
  //   if (passport) return passport.meta;
  //   return null;
  // };


  schema.virtual('online').get(function () {
    return module.online.isOnline(this._id);
  });

  return schema;
}

export default getSchema;
//
//
// export default (ctx, module) => {
//   const schema = getSchema(ctx, module);
//   return ctx.db.model('User', schema.getMongooseSchema(), 'user');
// };
