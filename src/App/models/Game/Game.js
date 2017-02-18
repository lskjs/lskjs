import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema' // eslint-disable-line


export function getSchema(ctx) { // eslint-disable-line
  // const mongoose = ctx.db;
  const schema = new UniversalSchema({
    userId: {
      type: String,
    },
    categoryId: {
      type: String,
    },
    tasks: {
      type: Array,
    },
    answers: {
      type: Array,
    },
    result: {
      type: Object,
    },
    boughtAt: {
      type: Date,
    },
    finishedAt: {
      type: Date,
    },
    cert: {
      type: Object,
    },
  });

  return schema;
}


export default (ctx) => {
  const schema = getSchema(ctx);
  return ctx.db.model('Game', schema.getMongooseSchema(), 'game');
};
