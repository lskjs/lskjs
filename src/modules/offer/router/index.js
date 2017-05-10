export default {
  async action({ next, page }) {
    return page
      .meta({
        title: 'Предложения',
        description: 'Все предложения',
        url: '/cabinet/offers',
      })
      .next(next);
  },
  children: [
    {
      path: '/',
      async action({ page, uapp }) {
        const { components, stores } = uapp.modules.offer;
        const { Offers } = components;
        const offers = new stores.OffersStore();
        await offers.fetchOffers(20);
        return page
          .component(Offers, { offers });
      },
    },
    {
      path: '/add',
      async action({ page, uapp }) {
        const { components } = uapp.modules.offer;
        const { NewOffer } = components;
        return page
          .meta({
            title: 'Новое предложение',
            description: 'Создание нового предложения',
            url: '/cabinet/offers/add',
          })
          .component(NewOffer, {});
      },
    },
    {
      path: '/:id',
      async action({ page, uapp }, { id }) {
        const { components, stores } = uapp.modules.offer;
        const { Offer } = components;
        const offer = await stores.OfferModel.getById(id);
        return page
          .meta({
            title: 'Предложение',
            description: 'Страница предложения',
            url: `/cabinet/offers/${id}`,
          })
          .component(Offer, { offer });
      },
    },
  ],
};
