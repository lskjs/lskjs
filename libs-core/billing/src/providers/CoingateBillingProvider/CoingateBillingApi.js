import Err from '@lskjs/err';
import Api from '@lskjs/server-api';

export default class CoingateBillingApi extends Api {
  getRoutes() {
    return {
      ...super.getRoutes(),
      '/create': this.create.bind(this),
      '/callback': this.callback.bind(this),
    };
  }
  url(...args) {
    return this.app.url(`/api/billing/coingate/${args[0]}`, ...args.slice(1));
  }

  async create(req) {
    const { billing } = await this.app.module(['crypto', 'billing']);
    const { coingate } = billing.providers;
    if (!coingate) throw new Err('!coingate');
    const { BillingTransactionModel } = this.models;
    const { amount } = req.data;
    const transaction = await BillingTransactionModel.createPayment({
      type: BillingTransactionModel.TYPE_IN,
      amount,
      provider: 'coingate',
      userId: req.user._id,
    });

    const transactionToken = coingate.encode(transaction._id);
    const callbackUrl = this.app.url(`/api/billing/coingate/callback`, { transactionToken });

    const data = {
      order_id: `transaction_${transaction._id}`,
      price_amount: transaction.amount / 100,
      price_currency: 'USD',
      receive_currency: 'BTC',
      callback_url: callbackUrl,
      success_url: this.app.url(`/cabinet/billing/${transaction._id}`),
      cancel_url: this.app.url(`/cabinet/billing/${transaction._id}`),
      description: `Top up #${transaction._id}`,
    };
    this.log.debug('create', data);

    try {
      const res = await coingate.createOrder(data);
      if (res.message) {
        this.log.error('billing/coingate res', res);
        throw [res.message, (res.errors || []).join(', ')].join(': ');
      }
      transaction.addEvent({
        type: 'createOrder',
        data: res,
      });
      transaction.meta.continueUrl = res.payment_url;
      transaction.markModified('meta');
      await transaction.save();
      return transaction;
    } catch (err) {
      transaction.addEvent({
        type: 'callback',
        data: err,
      });
      await transaction.save();
      throw err;
    }
  }

  // TODO:
  // / pending vs progress

  async callback(req) {
    const { BillingTransactionModel } = this.models;
    const { billing } = await this.app.module(['billing']);
    const { coingate } = billing.providers;
    if (!coingate) throw new Err('!coingate');
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
