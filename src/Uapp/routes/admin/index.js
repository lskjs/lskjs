/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import CabinetLayout from '../cabinet/CabinetLayout';

import Dashboard from './Dashboard';
import Profile from './Profile';
import Users from './Users';


export default {
  action({ next, page }) {
    return page
    .meta({
      title: 'Админ Панель',
      url: '/admin',
    })
    .layout(CabinetLayout)
    .next(next);
  },
  children: [
    {
      path: '/',
      async action({ page }) {
        return page
          .meta({
            title: 'Дешборд',
            url: '/admin',
          })
          .component(Dashboard, { page });
      },
    },
    {
      path: '/users',
      async action({ page }) {
        return page
          .meta({
            title: 'Пользователи',
            url: '/admin/users',
          })
          .component(Users, { page });
      },
    },
  ],
};
