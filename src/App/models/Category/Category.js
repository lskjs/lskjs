import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema'; // eslint-disable-line

export function getSchema(ctx) { // eslint-disable-line
  // const mongoose = ctx.db;
  const schema = new UniversalSchema({
    categoryId: {
      type: String,
    },
    tags: {
      type: [String],
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    image: {
      type: String,
    },
  });

  return schema;
}


export default (ctx) => {
  const schema = getSchema(ctx);
  return ctx.db.model('Category', schema.getMongooseSchema(), 'category');
};
