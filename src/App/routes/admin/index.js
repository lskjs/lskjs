/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import CabinetLayout from '../cabinet/CabinetLayout';

import Dashboard from './Dashboard';
import Profile from './Profile';
import Users from './Users';


export default {
  action({ next, page }) {
    return page
      .pushTitle('Администраторская', '/admin')
      .layout(CabinetLayout)
      .next(next);
  },
  children: [
    {
      path: '/',
      async action({ page }) {
        return page
          .pushTitle('Панель управления')
          // .description('Ваш кабинет')
          .component(Dashboard, { page });
      },
    },
    {
      path: '/profile',
      async action({ page }) {
        return page
          .pushTitle('Профиль')
          // .description('Ваш кабинет')
          .component(Profile, { page });
      },
    },
    {
      path: '/users',
      async action({ page }) {
        return page
          .pushTitle('Список пользователей')
          // .description('Ваш кабинет')
          .component(Users, { page });
      },
    },
  ],
};
