import Err from '@lskjs/err';
import Api from '@lskjs/server-api';
import set from 'lodash/set';

export default class InterkassaBillingApi extends Api {
  getRoutes() {
    return {
      '/index': ::this.index,
      '/create': ::this.create,
      '/check': ::this.check,
    };
  }
  url(...args) {
    return this.app.url(`/api/billing/interkassa/${args[0]}`, ...args.slice(1));
  }

  index() {
    return 'ok';
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
    const { BillingTransactionModel } = this.app.models;
    const interkassaModule = await billing.provider('interkassa');

    try {
      const res = await interkassaModule.coInvoice(transaction.meta.id);
      this.log.trace('interkassaModule.coInvoice res', res);
      transaction.addEvent({
        type: 'coInvoice',
        data: res,
      });

      const pendingStates = [0, 2, 3, 4];
      let status;
      if (res.state === 7) {
        status = BillingTransactionModel.STATUS_SUCCESS;
      } else if (pendingStates.includes(res.state)) {
        status = BillingTransactionModel.STATUS_PENDING;
      } else {
        status = BillingTransactionModel.STATUS_CANCELED;
      }
      await transaction.setStatus(status);

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
    await this.isAuth(req);
    const { billing } = await this.app.module(['billing']);
    const interkassaModule = await billing.provider('interkassa');
    const BillingTransactionModel = await this.app.module('models.BillingTransactionModel');
    // const BillingTransactionModel = await this.app.model('BillingTransactionModel');
    // const { amount } = req.data;
    const amount = 100;
    const transaction = await BillingTransactionModel.createPayment({
      type: BillingTransactionModel.TYPE_IN,
      amount,
      currency: 'RUB',
      provider: 'interkassa',
      userId: req.user._id,
    });

    const data = {
      ik_pm_no: transaction._id,
      ik_cur: transaction.currency,
      ik_am: transaction.amount / 100,
      ik_desc: `Transaction ${transaction._id}`,
      ik_cli: `UserId: ${transaction.userId}`,
    };
    try {
      this.log.debug('createPaymentUrl', 'transaction', transaction._id, 'data', data);
      const continueUrl = await interkassaModule.createPaymentUrl(data);
      this.log.trace('createPaymentUrl continueUrl', continueUrl);
      transaction.addEvent({
        method: 'createPaymentUrl',
        continueUrl,
      });
      set(transaction, 'meta.continueUrl', continueUrl);
      transaction.markModified('meta.continueUrl');
      await transaction.save();
      return transaction;
    } catch (err) {
      this.log.error('createPayment err', err);
      transaction.addEvent({
        method: 'createPaymentUrl',
        status: 'error',
        err,
      });
      await transaction.save();
      throw err;
    }
  }
}
