import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';
import set from 'lodash/set';
import Promise from 'bluebird';

function getSchema(ctx, module) {
  const mongoose = ctx.db;
  const { ObjectId } = mongoose.Schema.Types;
  const schema = new UniversalSchema({
    managerIds: [
      { // ID ответственного менеджера
        type: ObjectId,
        ref: 'User',
        index: true,
      },
    ],
    info: {
      subject: {
        type: String,
      },
      gmailThreadId: {
        type: String,
      },
    }, // нужно чтобы хранить всякую шнягу, offerId при рассылке о рекламе оффера и т.д
    meta: {
      summary: { // наброски, инфа для быстрого поиска
        lastEmail: {
          date: Date,
          from: { // от кого последнее сообщение
            type: String,
            enum: [
              'user', // пользователь с которым переписываемся(может его даже нет в системе еще)
              'manager', // менеджер который написал письмо
              'system', // какая то рассылка от нашей системы(возможно не нужно, непонятно как мониторить это)
            ],
          },
        },
        emails: {
          count: { // количество писем всего
            type: Number,
            default: 0,
          },
          inCount: { // количество входящие писем
            type: Number,
            default: 0,
          },
          outCount: { // количество исходящих писем
            type: Number,
            default: 0,
          },
        },
      },
    },
  }, {
    collection: module.prefix ? `${module.prefix}_thread` : 'thread',
  });

  schema.methods.calculateSummary = async function () {
    const { Email } = module.models;
    const {
      inCount,
      outCount,
      count,
      lastEmail,
    } = await Promise.props({
      inCount: Email.countDocuments({ threadId: this._id, subtype: 'i' }),
      outCount: Email.countDocuments({ threadId: this._id, subtype: 'o' }),
      count: Email.countDocuments({ threadId: this._id }),
      lastEmail: Email
        .findOne({ threadId: this._id })
        .select(['info.date']),
    });
    const summary = {
      emails: {
        inCount,
        outCount,
        count,
      },
    };
    if (lastEmail?.info?.date) {
      summary.lastEmail = {
        date: lastEmail.info.date,
      };
    }
    set(this, 'meta.summary', summary);
    this.markModified('meta.summary');
    return this;
  };

  return schema;
}

export default(ctx, module) => {
  return getSchema(ctx, module).getMongooseModel(ctx.db);
};
