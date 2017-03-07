/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import CabientLayout from '../CabinetLayout';
import FriendsPage from './FriendsPage';
import FriendsInRequestsPage from './tabs/InRequests';
import FriendsOutRequestsPage from './tabs/OutRequests';

export default {
  children: [
    {
      path: '/',
      async action({ ctx }) {
        const props = {
          title: 'Друзья',
          description: 'Список ваших друзей',
          siteTitle: ctx.config.siteTitle,
          children: <FriendsPage />,
        };
        props.breadcrumbs = [
          { key: 2, title: props.title, url: '/cabinet/friends' },
        ];
        return {
          title: props.title,
          component: <CabientLayout {...props} />,
        };
      },
    },
    {
      path: '/in',
      async action({ ctx }) {
        const props = {
          title: 'Входящие заявки',
          description: 'Заявки в друзья',
          siteTitle: ctx.config.siteTitle,
          children: <FriendsInRequestsPage />,
        };
        props.breadcrumbs = [
          { key: 2, title: 'Друзья', url: '/cabinet/friends' },
          { key: 3, title: props.title, url: '/cabinet/friends/in' },
        ];
        return {
          title: props.title,
          component: <CabientLayout {...props} />,
        };
      },
    },
    {
      path: '/out',
      async action({ ctx }) {
        const props = {
          title: 'Исходящие заявки',
          description: 'Заявки в друзья',
          siteTitle: ctx.config.siteTitle,
          children: <FriendsOutRequestsPage />,
        };
        props.breadcrumbs = [
          { key: 2, title: 'Друзья', url: '/cabinet/friends' },
          { key: 3, title: props.title, url: '/cabinet/friends/out' },
        ];
        return {
          title: props.title,
          component: <CabientLayout {...props} />,
        };
      },
    },
  ],
  async action({ next }) {
    const route = await next();
    return route;
  },
}