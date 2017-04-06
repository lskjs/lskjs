import Offers from './Offers';
import NewOffer from './NewOffer';

export default {
  children: [
    {
      path: '/',
      async action({ page, appStore }) {
        const offers = new appStore.stores.Offers();
        await offers.fetchOffers(5);
        return page
          .meta({
            title: 'Предложения',
            description: 'Все предложения',
            url: '/cabinet/offers',
          })
          .component(Offers, { offers });
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
  ],
  async action({ next }) {
    const route = await next();
    return route;
  },
};
