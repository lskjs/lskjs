/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import AdminLayout from './AdminLayout';

import Dashboard from './Dashboard';
import Profile from './Profile';
import Users from './Users';


export default {
  children: [
    {
      path: '/',
      async action({ ctx }) {
        const props = {
          title: 'Панель управления',
          description: 'Управление приложением',
          siteTitle: ctx.config.siteTitle,
          children: <Dashboard />,
        };
        return {
          title: props.title,
          component: <AdminLayout {...props} />,
        };
      },
    },
    {
      path: '/profile',
      async action({ ctx }) {
        const props = {
          title: 'Профиль',
          siteTitle: ctx.config.siteTitle,
          children: <Profile />,
        };
        return {
          title: props.title,
          component: <AdminLayout {...props} />,
        };
      },
    },
    {
      path: '/users',
      async action({ ctx }) {
        const props = {
          title: 'Список пользователей',
          siteTitle: ctx.config.siteTitle,
          children: <Users />,
        };
        return {
          title: props.title,
          component: <AdminLayout {...props} />,
        };
      },
    },
  ],
};
