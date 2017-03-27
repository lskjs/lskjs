import { getSchema as getDefaultSchema } from 'lego-starter-kit/CoreApp/models/User';

export function getSchema(ctx) {
  const { Types } = ctx.db.Schema;
  const DefaultSchema = getDefaultSchema(ctx);
  const schema = DefaultSchema.extend({
    meta: {
      type: Object,
      default: {},
    },
    // Аналог profile для других моделей
    // info: {
    //   type: Object,
    //   default: {},
    // }
    profile: {
      type: Object,
      default: {},
      // email: {
      //   type: String,
      // },
      // phone: {
      //   type: String,
      // },
      // firstName: {
      //   type: String,
      // },
      // lastName: {
      //   type: String,
      // },
      // middleName: {
      //   type: String,
      // },
      // avatar: {
      //   type: String,
      // },
      // about: {
      //   type: String,
      // },
      // city: {
      //   type: String,
      // },
      // sex: {
      //   type: String,
      //   enum: ['male', 'female', null],
      //   default: null,
      // },
      // bdate: {
      //   type: Date,
      // },
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
  });

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
