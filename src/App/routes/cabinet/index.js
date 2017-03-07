/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import CabientLayout from './CabinetLayout';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import PostsPage from './PostsPage';
import MessagesPage from './MessagesPage';

export default {
  children: [
    {
      path: '/',
      async action({ ctx }) {
        const props = {
          title: 'Личный кабинет',
          description: 'Ваш профиль',
          siteTitle: ctx.config.siteTitle,
          children: <ProfilePage />,
        };
        return {
          title: props.title,
          component: <CabientLayout {...props} />,
        };
      },
    },
    {
      path: '/settings',
      async action({ ctx }) {
        const props = {
          title: 'Редактирование профиля',
          description: 'Старница настроек',
          siteTitle: ctx.config.siteTitle,
          children: <SettingsPage />,
        };
        props.breadcrumbs = [
          { key: 2, title: props.title, url: '/cabinet/settings' },
        ];
        return {
          title: props.title,
          component: <CabientLayout {...props} />,
        };
      },
    },
    {
      path: '/friends',
      ...require('./FriendsPage/index').default,
    },
    {
      path: '/posts',
      async action({ ctx }) {
        const props = {
          title: 'Публикации',
          description: 'Посты созданные тобой',
          siteTitle: ctx.config.siteTitle,
          children: <PostsPage />,
        };
        props.breadcrumbs = [
          { key: 2, title: props.title, url: '/cabinet/posts' },
        ];
        return {
          title: props.title,
          component: <CabientLayout {...props} />,
        };
      },
    },
    {
      path: '/im',
      async action({ ctx }) {
        const props = {
          title: 'Сообщения',
          description: 'Все сообщения',
          siteTitle: ctx.config.siteTitle,
          children: <MessagesPage />,
        };
        props.breadcrumbs = [
          { key: 2, title: props.title, url: '/cabinet/im' },
        ];
        return {
          title: props.title,
          component: <CabientLayout {...props} />,
        };
      },
    },
    {
      path: '*',
      action() {
        throw 'Not found in cabinet'
      },
    },
  ],
  async action({ next }) {
    const route = await next();
    return route;
  },
};
