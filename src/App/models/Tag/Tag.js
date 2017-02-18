// import {Schema} from 'universal-model'
//
// export default(ctx) => {
//   return new Schema({
//     categoryId: {
//       type: String
//     },
//     tags: {
//       type: [String]
//     },
//     title: {
//       type: String
//     },
//     subtitle: {
//       type: String
//     },
//     image: {
//       type: String
//     }
//   }, {collection: 'Category'})
// }

import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema'

export function getSchema(ctx) {
  // const mongoose = ctx.db;
  const schema = new UniversalSchema({
    key: {
      type: String,
    },
    title: {
      type: String,
    },
  })

  return schema
}


export default (ctx) => {
  const schema = getSchema(ctx);
  return ctx.db.model('Tag', schema.getMongooseSchema(), 'tag')
}
