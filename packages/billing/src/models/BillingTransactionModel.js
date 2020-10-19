import MongooseSchema from '@lskjs/db/MongooseSchema';
import omit from 'lodash/omit';

export const TRANSACTION_TYPE_IN = 'in'; // Пополнение
export const TRANSACTION_TYPE_BETWEEN = 'internal'; // Перевод внутри системы
export const TRANSACTION_TYPE_OUT = 'out'; // Снятие

export const TRANSACTION_STATUS_PENDING = 'pending';
export const TRANSACTION_STATUS_FAILURE = 'failure';
export const TRANSACTION_STATUS_SUCCESS = 'success';
//
export default (app) => {
  const schema = new MongooseSchema(
    {
      // intId: { type: Number, required: true },
      provider: String, // bank, g2a, etc.
      currency: { type: String }, // RUB, USD, BTC, LSKCOIN
      amount: { type: Number, required: true }, // в центах
      type: { type: String, required: true }, // in, out, internal

      status: { type: String }, // TRANSACTION_STATUS_* // null, progress, succcess, error
      userId: { type: MongooseSchema.Types.ObjectId, ref: 'User', required: true },
      companyId: { type: MongooseSchema.Types.ObjectId },
      info: { type: Object }, // qiwi, usd
      meta: { type: Object }, // qiwi, usd
      private: {
        //  new MongooseSchema.Schema({})
        type: Object, // Logs
      },
    },
    {
      model: 'BillingTransaction',
      collection: 'billing_transactions',
    },
  );
  schema.statics.TYPE_IN = TRANSACTION_TYPE_IN;
  schema.statics.TYPE_BETWEEN = TRANSACTION_TYPE_BETWEEN;
  schema.statics.TYPE_OUT = TRANSACTION_TYPE_OUT;
  schema.statics.STATUS_PENDING = TRANSACTION_STATUS_PENDING;
  schema.statics.STATUS_FAILURE = TRANSACTION_STATUS_FAILURE;
  schema.statics.STATUS_SUCCESS = TRANSACTION_STATUS_SUCCESS;

  schema.statics.updateBalance = async function () {
    return {};
  };
  // schema.statics.updateBalance = async function (transaction) {
  //   const { UserModel } = app.models;
  //   const user = await UserModel.findById(transaction.userId);
  //   const balanceBefore = get(user, 'private.balance', 0);
  //   await user.updateBalance();
  //   const balanceAfter = balanceBefore + this.amount;
  //   return { balanceBefore, balanceAfter };
  // };
  schema.statics.createPayment = async function (params) {
    const transaction = new this({
      ...params,
    });
    return transaction.save();
  };

  schema.methods.changeStatus = async function (newStatus, params) {
    this.wasStatus = this.status;
    this.status = newStatus;
    if (!this.meta) this.meta = {};

    this.meta.statusInfo = {
      wasStatus: this.wasStatus,
      status: this.status,
      updatedAt: new Date(),
      ...params,
    };

    this.markModified('meta');
    this.markModified('meta.statusInfo');

    const statusChanged = this.wasStatus !== newStatus;
    if (statusChanged) {
      const { balanceBefore, balanceAfter } = await this.statics.updateBalance(this);
      if (balanceBefore !== null && balanceAfter !== null) {
        this.meta.statusInfo.balanceBefore = balanceBefore;
        this.meta.statusInfo.balanceAfter = balanceAfter;
      }
    }
    this.addEvent({
      type: 'changeStatus',
      ...this.meta.statusInfo,
    });
    return this;
  };

  schema.methods.addEvent = function (params = {}) {
    if (!this.private) this.private = {};
    if (!this.private.events) this.private.events = [];
    const event = {
      createdAt: params.createdAt || new Date(),
      ...params,
    };
    this.private.events.push(event);
    this.markModified('private.events');
  };

  schema.statics.prepareOne = async function (obj) {
    return omit(obj, ['private']);
  };

  return schema;
};
