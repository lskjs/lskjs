import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';
import { getSchema as getDefaultSchema } from 'lego-starter-kit/CoreApp/models/User';

export function getSchema(ctx) {
  const DefaultSchema = getDefaultSchema(ctx);
  const schema = DefaultSchema.extend({
    surname: {
      type: String,
    },
    middlename: {
      type: String,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
    },
    info: {
      phone: {
        type: String,
      },
      company: {
        type: String,
      },
    },
  });

  return schema;
}


export default (ctx) => {
  const schema = getSchema(ctx);
  return ctx.db.model('User', schema.getMongooseSchema(), 'user');
};
