import Offers from './Offers';
import Offer from './Offer';
import NewOffer from './NewOffer';

export default {
  children: [
    {
      path: '/',
      async action({ page, uapp }) {
        // const offers = new uapp.stores.Offers();
        // await offers.fetchOffers(5);
        return page
          .meta({
            title: 'Предложения',
            description: 'Все предложения',
            url: '/cabinet/offers',
          })
          .component(Offers, { /*offers*/ });
      },
    },
    {
      path: '/add',
      async action({ page }) {
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
        // const offer = await uapp.models.Offer.getById(id);
        return page
          .meta({
            title: 'Кек',
            description: 'Страница предложения',
            url: `/cabinet/offers/${id}`,
          })
          .component(Offer, { /*offer*/ });
      },
    },
  ],
  async action({ next }) {
    const route = await next();
    return route;
  },
};
