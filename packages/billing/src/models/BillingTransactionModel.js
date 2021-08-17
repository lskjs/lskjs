import Model from '@lskjs/db/Model';
import omit from 'lodash/omit';
//
export default class BillingTransactionModel extends Model {
  static schema = {
    // intId: { type: Number, required: true },
    provider: String, // bank, g2a, etc.
    currency: { type: String }, // RUB, USD, BTC, LSKCOIN
    amount: { type: Number, required: true }, // в центах
    type: { type: String, required: true }, // in, out, internal

    status: { type: String }, // TRANSACTION_STATUS_* // null, progress, succcess, error
    userId: { type: Model.Types.ObjectId, ref: 'UserModel', required: true },
    companyId: { type: Model.Types.ObjectId },
    info: { type: Object }, // qiwi, usd
    meta: { type: Object }, // qiwi, usd
    private: {
      //  new Model.Schema({})
      type: Object, // Logs
    },
  };
  static options = {
    model: 'BillingTransactionModel',
    collection: 'billing_transactions',
  };

  static TYPE_IN = 'in'; // Пополнение
  static TYPE_BETWEEN = 'internal'; // Перевод внутри системы
  static TYPE_OUT = 'out'; // Снятие

  static STATUS_PENDING = 'pending';
  static STATUS_FAILURE = 'failure';
  static STATUS_SUCCESS = 'success';

  static async updateBalance() {
    return {};
  }
  static async createPayment(params) {
    const transaction = new this({
      ...params,
    });
    return transaction.save();
  }

  async changeStatus(newStatus, params) {
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
      const { balanceBefore, balanceAfter } = await this.constructor.updateBalance(this);
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
  }

  addEvent(params = {}) {
    if (!this.private) this.private = {};
    if (!this.private.events) this.private.events = [];
    const event = {
      createdAt: params.createdAt || new Date(),
      ...params,
    };
    this.private.events.push(event);
    this.markModified('private.events');
  }

  static async prepareOne(obj) {
    return omit(obj, ['private']);
  }
}
