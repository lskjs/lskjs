import CabinetLayout from './CabinetLayout';

import DashboardPage from './DashboardPage';
import UserPage from './UserPage';
import UsersPage from './UsersPage';
import SettingsPage from './SettingsPage';
import PostsPage from './PostsPage';
import MessagesPage from './MessagesPage';

export default {
  async action({ next, page, appStore }) {
    // if (!await appStore.auth.isAuthAsync()) return page.redirect('/auth/login');
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
        return page
          .component(DashboardPage, {});
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
          .component(UserPage, { user });
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
          .component(SettingsPage, {});
      },
    },
    {
      path: '/friends',
      ...require('./FriendsPage/index').default,
    },
    {
      path: '/users',
      async action({ page, appStore }) {
        const users = new appStore.stores.Users();
        await users.fetchUsers();
        return page
          .meta({
            title: 'Список пользователей',
            description: 'Все пользователи',
            url: '/cabinet/users',
          })
          .component(UsersPage, { users });
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
          .component(PostsPage, {});
      },
    },
    {
      path: '/messages',
      async action({ page }) {
        return page
          .meta({
            title: 'Сообщения',
            description: 'Все сообщения',
            url: '/cabinet/posts',
          })
          .component(MessagesPage, {});
      },
    },
    {
      path: '*',
      action() {
        throw 'Page not found in cabinet';
      },
    },
  ],
};
