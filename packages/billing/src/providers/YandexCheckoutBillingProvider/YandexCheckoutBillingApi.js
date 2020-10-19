import Err from '@lskjs/utils/Err';
import Api from '@lskjs/server-api';
import get from 'lodash/get';
import set from 'lodash/set';

export default class YandexCheckoutBillingApi extends Api {
  name = 'YandexCheckoutBillingApi';
  getRoutes() {
    return {
      '/index': ::this.index,
      '/create': ::this.create,
      '/callback': ::this.callback,
      '/check': ::this.check,
    };
  }
  url(...args) {
    return this.app.url(`/api/billing/yandexCheckout/${args[0]}`, ...args.slice(1));
  }

  index() {
    return 'ok';
  }

  async check(req) {
    this.log = this.app.log;
    await this.isAuth(req);
    const { billing } = await this.app.module(['billing']);
    const { client } = await billing.provider('yandexCheckout');
    const { _id } = req.data;
    if (!_id) throw new Err('params.required', { status: 400, data: { field: '_id' } });
    const { BillingTransactionModel } = this.app.models;

    const transaction = await BillingTransactionModel.findById(_id);
    const res = await client.getPayment('271d3718-000f-5000-a000-1fadb264a853');
    this.log.trace('res', res);

    await transaction.setStatus(res.status);
    await transaction.save();

    return res;
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
      provider: 'yandexCheckout',
      userId: req.user._id,
    });

    const data = {
      amount: {
        value: String(transaction.amount / 100),
        currency: 'RUB',
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
      transaction.markModified('meta.continueUrl');
      await transaction.save();
      return transaction;
    } catch (err) {
      this.log.error('createPayment err', err);
      transaction.addEvent({
        method: 'createPayment',
        data: err,
      });
      await transaction.save();
      throw err;
    }
  }

  // TODO:
  // / pending vs progress

  async callback(req) {
    const { BillingTransactionModel } = this.app.models;
    const { billing } = await this.app.module(['billing']);
    const { coingate } = billing.providers;
    if (!coingate) throw '!coingate';
    const { transactionToken } = req.query;
    const id = coingate.decode(transactionToken);
    const transaction = await BillingTransactionModel.findById(id);
    if (!transaction) throw new Err('billing.transaction.notFound', { status: 404, data: { id } });
    if (transaction.status !== BillingTransactionModel.STATUS_PENDING) {
      throw new Err('transaction.notPending', { status: 400, data: { id } });
    }
    const data = req.body;

    this.log.trace('callback', data);
    const { status } = data;
    transaction.addEvent({
      type: status,
      data,
    });
    if (status === 'paid') {
      await transaction.changeStatus(BillingTransactionModel.STATUS_SUCCESS);
      // dkjkdfjkdjfkdfjdsdfslkfjklsdfdsflknsklnkdnlknklmkldsfjsdklmksldmklvsdklmsdklfmsdklfjskldfmksdlkfmsdklsnklsdnfklnsd;
    } else if (status === 'expired' || status === 'invalid' || status === 'canceled') {
      await transaction.changeStatus(BillingTransactionModel.STATUS_CANCELED);
      // this.emitrlog.broadcast('root', `coingate err 1 ${id} ${status}`);
    }
    await transaction.save();

    return 'ok';
  }
}
