/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import CabinetLayout from './CabinetLayout';

import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import PostsPage from './PostsPage';
import MessagesPage from './MessagesPage';

export default {
  action({ next, page }) {
    return page
      .pushTitle('Кабинет', '/cabinet')
      .layout(CabinetLayout)
      .next(next);
  },
  children: [
    {
      path: '/',
      async action({ page }) {
        return page
          .pushTitle('Личный кабинет')
          // .description('Ваш кабинет')
          .component(ProfilePage, { page });
      },
    },
    {
      path: '/settings',
      async action({ page }) {
        return page
          .pushTitle('Редактирование профиля', '/cabinet/settings')
          // .description('Старница настроек')
          .component(SettingsPage, { page });
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
          .pushTitle('Публикации', '/cabinet/posts')
          // .description('Посты созданные тобой')
          .component(PostsPage, { page });
      },
    },
    {
      path: '/im',
      async action({ page }) {
        return page
          .pushTitle('Сообщения', '/cabinet/im')
          // .description('Все сообщения')
          .component(MessagesPage, { page });
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
