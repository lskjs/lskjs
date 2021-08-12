import Err from '@lskjs/err';
import Api from '@lskjs/server-api';
import get from 'lodash/get';
import set from 'lodash/set';

export default class YandexCheckoutBillingApi extends Api {
  getRoutes() {
    return {
      ...super.getRoutes(),
      '/create': ::this.create,
      '/callback': ::this.callback,
      '/check': ::this.check,
    };
  }
  url(...args) {
    return this.app.url(`/api/billing/yandexCheckout/${args[0]}`, ...args.slice(1));
  }
  async check(req) {
    await this.isAuth(req);
    const { _id } = req.data;
    if (!_id) throw new Err('params.required', { status: 400, data: { field: '_id' } });
    const { BillingTransactionModel } = this.app.models;
    const transaction = await BillingTransactionModel.findById(_id);
    return this._checkTransactionAndSave(transaction);
  }
  async _checkTransactionAndSave(transaction) {
    const { billing } = await this.app.module(['billing']);
    const { client } = await billing.provider('yandexCheckout');

    try {
      const res = await client.getPayment(transaction.meta.id);
      this.log.trace('getPayment res', res);
      transaction.addEvent({
        type: 'getPayment',
        data: res,
      });
      await transaction.setStatus(res.status);
      await transaction.save();
      return transaction;
    } catch (err) {
      this.log.error('check err', err);
      transaction.addEvent({
        method: 'check',
        data: err,
      });
      await transaction.save();
      throw err;
    }
  }
  async create(req) {
    this.log = this.app.log;
    await this.isAuth(req);
    const { billing } = await this.app.module(['billing']);
    const { client } = await billing.provider('yandexCheckout');
    const { BillingTransactionModel } = this.app.models;
    // const BillingTransactionModel = await this.app.model('BillingTransactionModel');
    // const { amount } = req.data;
    const amount = 100;
    const transaction = await BillingTransactionModel.createPayment({
      type: BillingTransactionModel.TYPE_IN,
      amount,
      currency: 'RUB',
      provider: 'yandexCheckout',
      userId: req.user._id,
    });

    const data = {
      amount: {
        currency: transaction.currency,
        value: String(transaction.amount / 100),
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: this.app.url(`/cabinet/billing/${transaction._id}`),
      },
    };

    try {
      this.log.debug('createPayment', 'transaction', transaction._id, 'data', data);
      const res = await client.createPayment(data, transaction._id);
      this.log.trace('createPayment res', res);
      transaction.addEvent({
        method: 'createPayment',
        data,
        res,
      });
      set(transaction, 'meta.id', get(res, 'id'));
      set(transaction, 'meta.continueUrl', get(res, 'confirmation.confirmation_url'));
      transaction.markModified('meta.id');
      transaction.markModified('meta.continueUrl');
      await transaction.save();
      return transaction;
    } catch (err) {
      this.log.error('createPayment err', err);
      transaction.addEvent({
        method: 'createPayment',
        status: 'error',
        err,
      });
      await transaction.save();
      throw err;
    }
  }

  async callback(req) {
    const { yandexId } = req.data;
    const { BillingTransactionModel } = this.app.models;
    const transaction = await BillingTransactionModel.findById({ 'meta.id': yandexId });
    return this._checkTransactionAndSave(transaction);
  }
}
