import FriendsPage from './FriendsPage';
import FriendsInRequestsPage from './tabs/InRequests';
import FriendsOutRequestsPage from './tabs/OutRequests';

export default {
  children: [
    {
      path: '/',
      async action({ page }) {
        return page
          .pushTitle('Друзья')
          // .description('Список ваших друзей')
          .component(FriendsPage, { page });
      },
    },
    {
      path: '/in',
      async action({ page }) {
        return page
          .pushTitle('Входящие заявки')
          // .description('Заявки в друзья')
          .component(FriendsInRequestsPage, { page });
      },
    },
    {
      path: '/out',
      async action({ page }) {
        return page
          .pushTitle('Исходящие заявки')
          // .description('Заявки в друзья')
          .component(FriendsOutRequestsPage, { page });
      },
    },
  ],
  async action({ next }) {
    const route = await next();
    return route;
  },
}
