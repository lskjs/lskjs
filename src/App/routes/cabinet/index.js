import CabinetLayout from './CabinetLayout';

import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import PostsPage from './PostsPage';
import MessagesPage from './MessagesPage';

export default {
  async action({ next, page, appStore }) {
    if (!await appStore.auth.isAuthAsync()) throw 'Не авторизован';
    return page
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
          .component(ProfilePage, {});
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
