import CabinetLayout from './CabinetLayout';

import Dashboard from './Dashboard';
import User from './User';
import Users from './Users';
import Settings from './Settings';
import Posts from './Posts';
import Messages from './Messages';
import Comments from './Comments';
import Offers from './Offers';

export default {
  async action({ next, page }) {
    return page
      .isAuth()
      .meta({
        title: 'Кабинет',
        description: 'Личный кабинет',
        url: '/cabinet',
      })
      .layout(CabinetLayout)
      .next(next);
  },
  children: [
    {
      path: '/',
      async action({ page }) {
        return page.redirect('/cabinet/dashboard');
      },
    },
    {
      path: '/dashboard',
      async action({ page }) {
        return page
          .meta({
            title: 'Дешборд',
            url: '/cabinet/dashboard',
          })
          .component(Dashboard, {});
      },
    },
    {
      path: '/comments',
      async action({ page }) {
        return page
          .meta({
            title: 'Комментарии',
            url: '/cabinet/comments',
          })
          .component(Comments, {});
      },
    },
    {
      path: '/user/:id',
      async action({ page, appStore }, { id }) {
        const user = await appStore.models.User.getById(id);
        return page
          .meta({
            title: user.fullName,
            description: 'Профиль пользователя',
            url: `/cabinet/user/${id}`,
          })
          .component(User, { user });
      },
    },
    {
      path: '/settings',
      async action({ page }) {
        return page
          .meta({
            title: 'Редактирование профиля',
            description: 'Старница настроек',
            url: '/cabinet/settings',
          })
          .component(Settings, {});
      },
    },
    {
      path: '/friends',
      ...require('./Friends/index').default,
    },
    {
      path: '/users',
      async action({ page, appStore }) {
        const users = new appStore.stores.Users();
        await users.fetchUsers(5);
        return page
          .meta({
            title: 'Список пользователей',
            description: 'Все пользователи',
            url: '/cabinet/users',
          })
          .component(Users, { users });
      },
    },
    {
      path: '/posts',
      async action({ page }) {
        return page
          .meta({
            title: 'Публикации',
            description: 'Посты созданные тобой',
            url: '/cabinet/posts',
          })
          .component(Posts, {});
      },
    },
    {
      path: '/messages',
      async action({ page }) {
        return page
          .meta({
            title: 'Сообщения',
            description: 'Все сообщения',
            url: '/cabinet/messages',
          })
          .component(Messages, {});
      },
    },
    {
      path: '/offers',
      ...require('./Offers/index').default,
    },
    {
      path: '*',
      action() {
        throw 'Page not found in cabinet';
      },
    },
  ],
};
