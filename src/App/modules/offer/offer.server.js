import { autobind } from 'core-decorators';
import getModels from './models';


export default (ctx) => {
  return class OfferModule {

    async init() {
      this.models = getModels(ctx);
    }
    async run() {
      ctx.app.use('/api/module/offer', this.getOfferApi());
      ctx.app.use('/api/module/deal', this.getDealApi());
    }

    getDealApi() {
      const { wrapResourse, createResourse, checkNotFound } = ctx.helpers;
      const { Offer, Deal } = this.models;
      const api = ctx.asyncRouter();
      // api.use(isAuth);
      api.get('/user/:id/', async (req) => {
        return Deal
        .find({
          userId: req.data.id,
        });
      });
      api.post('/', async (req) => {
        const userId = req.user._id;
        const { offerId } = req.data;
        const offer = await Offer
        .findById(offerId)
        .then(checkNotFound);
        const params = req.data;
        params.userId = userId;
        params.offerUserId = offer.userId;
        const deal = new Deal(params);
        return deal.save();
      });
      api.use('/', wrapResourse(createResourse(Deal)));
      return api;
    }

    getOfferApi() {
      const { wrapResourse, createResourse, checkNotFound } = ctx.helpers;
      const { Offer } = this.models;
      const api = ctx.asyncRouter();
      // api.use(isAuth);
      api.get('/', async () => {
        return Offer
        .find()
        .populate('user');
      });
      api.get('/:id', async (req) => {
        return Offer
        .findById(req.data.id)
        .populate('user')
        .then(checkNotFound);
      });
      api.get('/user/:id/', async (req) => {
        const data = req.data;
        const params = {};
        params.userId = req.data.id;
        if (data.dealId) params.dealId = data.dealId;
        // if (data.) params.dealId = data.dealId;
        return Offer
        .find({
          userId: req.data.id,
        })
        .populate('user');
      });
      api.get('/deal/:id', async (req) => {
        return Offer
        .find({
          dealId: req.data.id,
        });
      });
      api.post('/', async (req) => {
        const userId = req.user._id;
        const params = req.data;
        params.userId = userId;
        const offer = new Offer(params);
        return offer.save();
      });
      api.use('/', wrapResourse(createResourse(Offer)));
      return api;
    }
  };
};
