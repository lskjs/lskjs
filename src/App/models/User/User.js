import { getSchema as getDefaultSchema } from 'lego-starter-kit/CoreApp/models/User';

export function getSchema(ctx) {
  const { Types } = ctx.db.Schema;
  const DefaultSchema = getDefaultSchema(ctx);
  const schema = DefaultSchema.extend({
    // Аналог profile для других моделей
    // info: {
    //   type: Object,
    //   default: {},
    // }
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
  });

  schema.methods.updateSocialData = async function () {
    const passport = await ctx.models.Passport.findOne({
      provider: 'youtube',
      user: this._id,
    });
    console.log(passport);
    if (passport) {
      return passport.updateUser();
    }
    return null;
  };
  schema.methods.getSocialData = async function () {
    const passport = await ctx.models.Passport.findOne({
      provider: 'youtube',
      user: this._id,
    });
    if (passport) return passport.meta;
    return null;
  };

  schema.virtual('online').get(() => {
    return false;
  });
  schema.virtual('fullname').get(() => {
    let fullname = '';
    if (this.firstName) fullname += this.firstName;
    if (this.lastName) {
      if (fullname.length > 0) fullname += ' ';
      fullname += this.lastName;
    }
    return fullname;
  });

  return schema;
}


export default (ctx) => {
  const schema = getSchema(ctx);
  return ctx.db.model('User', schema.getMongooseSchema(), 'user');
};
