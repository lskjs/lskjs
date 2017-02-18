import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema'; // eslint-disable-line

export function getSchema(ctx) { // eslint-disable-line
  // const mongoose = ctx.db;
  const schema = new UniversalSchema({
    platform: {
      type: String,
    },
    categoryId: {
      type: String,
    },
    question: {
      type: Object,
    },
    answers: {
      type: Array,
    },
    title: {
      type: String,
    },
  }, {
    strict: false,
  });

  return schema;
}


export default (ctx) => {
  const schema = getSchema(ctx);
  return ctx.db.model('Task', schema.getMongooseSchema(), 'task');
};
