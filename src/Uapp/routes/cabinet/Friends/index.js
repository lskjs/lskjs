import FriendsPage from './Friends';
import FriendsInRequestsPage from './tabs/InRequests';
import FriendsOutRequestsPage from './tabs/OutRequests';

export default {
  children: [
    {
      path: '/',
      async action({ page }) {
        return page
          .meta({
            title: 'Друзья',
            description: 'Список ваших друзей',
            url: '/cabinet/friends',
          })
          .component(FriendsPage, {});
      },
    },
    {
      path: '/in',
      async action({ page }) {
        return page
          .meta({
            title: 'Входящие заявки',
            description: 'Заявки в друзья',
            url: '/cabinet/friends/in',
          })
          .component(FriendsInRequestsPage, { page });
      },
    },
    {
      path: '/out',
      async action({ page }) {
        return page
          .meta({
            title: 'Исходящие заявки',
            description: 'Заявки в друзья',
            url: '/cabinet/friends/in',
          })
          .component(FriendsOutRequestsPage, {});
      },
    },
  ],
  async action({ next }) {
    const route = await next();
    return route;
  },
};
