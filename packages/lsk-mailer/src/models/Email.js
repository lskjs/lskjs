import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';
import Promise from 'bluebird';

function getSchema(ctx, module) {
  const mongoose = ctx.db;
  const { ObjectId } = mongoose.Schema.Types;
  const schema = new UniversalSchema({
    uid: {
      type: Number,
      required: true,
      unique: true,
    },
    threadId: {
      type: ObjectId,
      ref: 'Thread',
      index: true,
    },
    subtype: { // Тип, входящая/исходящая почта
      type: String,
      required: true,
      enum: [
        'i', // входящая почта
        'o', // исходящая почта
      ],
    },
    info: {
      cc: {
        type: Array,
      },
      bcc: {
        type: Array,
      },
      text: { // Текст письма
        type: String,
      },
      html: { // html письма
        type: String,
      },
      subject: { // тема письма
        type: String,
        index: true,
      },
      receivedDate: { // дата получения, у отправленных ее почему то нет
        type: Date,
        index: true,
      },
      date: { // дата отправки
        type: Date,
        index: true,
      },
      references: {
        type: [String],
        index: true,
      }, // Нужно для reply (id сообщений которые шли до этого сообщения в переписке)
      messageId: {
        type: String,
        index: true,
      }, // Нужно для reply (id сообщения в переписке)
    },
    from: { // от кого
      address: { // почта
        type: String,
      },
      name: { // имя
        type: String,
      },
      userId: { // ID юзера в системе(может и не быть)
        type: ObjectId,
        ref: 'User',
        index: true,
      },
    },
    to: { // кому
      address: { // почта
        type: String,
      },
      name: { // имя
        type: String,
      },
      userId: { // ID юзера в системе(может и не быть)
        type: ObjectId,
        ref: 'User',
        index: true,
      },
    },
  }, {
    collection: module.prefix ? `${module.prefix}_email` : 'email',
  });

  return schema;
}

export default(ctx, module) => {
  return getSchema(ctx, module).getMongooseModel(ctx.db);
};
