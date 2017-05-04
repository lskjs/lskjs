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
      const { isAuth } = ctx.middlewares;
      const { Offer, Deal } = this.models;
      const api = ctx.asyncRouter();
      // api.use(isAuth);
      api.get('/user/:id/', async (req) => {
        const { id: userId } = req.params;
        return Deal
        .find({
          userId,
        });
      });
      api.post('/', async (req) => {
        const userId = req.user._id;
        const { offerId } = req.allParams();
        const offer = await Offer
        .findById(offerId)
        .then(checkNotFound);
        const params = req.allParams();
        params.userId = userId;
        params.offerUserId = offer.userId;
        const deal = new Deal(params);
        await deal.save();
        return Deal.populate(deal, 'user');
      });

      api.get('/:id/accept', isAuth, async (req) => {
        const params = req.allParams();
        const deal = await Deal
          .findById(params.id)
          .populate('user')
          .then(checkNotFound);
        const offer = await Offer
          .findById(deal.offerId)
          .populate('deal')
          .populate('user')
          .then(checkNotFound);
        offer.dealId = deal._id;
        offer.status = 'inProgress';
        deal.status = 'accepted';
        await offer.save();
        return deal.save();
      });

      api.get('/:id/reject', isAuth, async (req) => {
        const params = req.allParams();
        const deal = await Deal
          .findById(params.id)
          .populate('user')
          .then(checkNotFound);
        const offer = await Offer
          .findById(deal.offerId)
          .populate('deal')
          .populate('user')
          .then(checkNotFound);
        offer.dealId = null;
        offer.status = 'notStarted';
        deal.status = 'rejected';
        offer.save();
        return deal.save();
      });

      api.use('/', wrapResourse(createResourse(Deal)));
      return api;
    }

    getOfferApi() {
      const { wrapResourse, createResourse, checkNotFound } = ctx.helpers;
      const { Offer, Deal } = this.models;
      const api = ctx.asyncRouter();
      // api.use(isAuth);
      api.get('/', async () => {
        return Offer
        .find()
        .populate('user');
      });
      api.get('/:id', async (req) => {
        return Offer
        .findById(req.params.id)
        .populate('user')
        .then(checkNotFound);
      });
      api.get('/:id/user', async (req) => {
        const data = req.params;
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
      api.get('/:id/deals', async (req) => {
        console.log(req.params, 'req.params')
        return Deal
          .find({
            offerId: req.params.id,
          })
          .populate('user');
      });
      api.post('/', async (req) => {
        const userId = req.user._id;
        const params = req.data;
        params.userId = userId;
        const offer = new Offer(params);
        return offer.save();
      });
      api.put('/:id', async (req) => {
        const params = req.allParams()
        const { id } = params
        const offer = await Offer
          .findById(id)
          .then(checkNotFound)
        offer.status = params.status
        return offer.save();
      });
      api.use('/', wrapResourse(createResourse(Offer)));
      return api;
    }
  };
};
