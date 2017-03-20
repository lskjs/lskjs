import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';
import { getSchema as getDefaultSchema } from 'lego-starter-kit/CoreApp/models/User';

export function getSchema(ctx) {
  const mongoose = ctx.db
  const DefaultSchema = getDefaultSchema(ctx);
  const schema = DefaultSchema.extend({
    username: {
      type: String,
      // required: true,
      // index: { unique: true },
      tolowercase: true,
      trim: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    avatar: {
      type: String,
    },
    // email: {
    //   type: String,
    // },
    info: {
      type: Object,
    },
    passports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passport',
      },
    ],
  });

  schema.virtual('fullname').get(function () {
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
