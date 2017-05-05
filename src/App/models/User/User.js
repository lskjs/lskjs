import { getSchema as getDefaultSchema } from 'lego-starter-kit/CoreApp/models/User';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
export function getSchema(ctx) {
  const sample = {
    avatar: '/assets/no-avatar.png',
    fullName: 'Счастливый Пользователь',
  };
  function fullName(profile) {
    let fullname;
    if (profile.middleName) {
      fullname = [profile.lastName, profile.firstName, profile.middleName];
    } else {
      fullname = [profile.firstName, profile.lastName];
    }
    return fullname.filter(a => a).join(' ') || sample.fullName;
  }

  const { e400, e500 } = ctx.errors;
  const { Types } = ctx.db.Schema;
  const DefaultSchema = getDefaultSchema(ctx);
  const schema = DefaultSchema.extend({
    // Аналог profile для других моделей
    // info: {
    //   type: Object,
    //   default: {},
    // }
    email: {
      type: String,
    },
    visitedAt: {
      type: Date,
      default: Date.now,
    },
    passports: [
      {
        type: Types.ObjectId,
        ref: 'Passport',
      },
    ],
  }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

  schema.pre('save', function (next) {
    if (this.isModified('profile')) {
      this.name = fullName(this.profile) || '';
    }
    return next();
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
    return `${ctx.config.url}/api/v1/auth/email/approve?t=${token}`;
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

  schema.methods.updateSocialData = async function () {
    const passport = await ctx.models.Passport.findOne({
      provider: 'youtube',
      user: this._id,
    });
    if (passport) {
      return passport.updateUser();
    }
    return null;
  };
  schema.methods.getSocialData = async function (provider) {
    const params = {
      user: this._id,
    };
    if (provider) params.provider = provider;
    const passport = await ctx.models.Passport.findOne(params);
    if (passport) return passport.meta;
    return null;
  };

  schema.virtual('online').get(() => {
    return false;
  });

  return schema;
}


export default (ctx) => {
  const schema = getSchema(ctx);
  return ctx.db.model('User', schema.getMongooseSchema(), 'user');
};
