import React, { Component } from 'react';
import AuthPage from './AuthPage';
import AuthLayout from '../MainLayout';
import getData from './getData';

export default {
  action({ next, page }) {
    return page
      .pushTitle('Авторизация')
      .layout(AuthLayout)
      .next(next);
  },
  children: [
    {
      path: '/(login|)',
      action({ page }) {
        return page
          .pushTitle('Вход')
          .component(AuthPage, { type: 'login' });
      },
    },
    {
      path: '/recovery',
      action({ page }) {
        return page
          .pushTitle('Восстановление пароля')
          .component(AuthPage, { type: 'recovery' });
      },
    },
    {
      path: '/signup',
      action({ page }) {
        return page
          .pushTitle('Signup')
          .component(AuthPage, { type: 'signup' });
      },
    },
    {
      path: '/passport',
      async action(params) {
        const { appStore, query, page } = params;
        let passport;
        try {
          passport = (await getData(params)).passport;
        } catch (err) {
          throw err;
        }
        if (passport.user) {
          if (__SERVER__) {
            return page
              .pushTitle('Вход через соц.сеть')
              .component(<div>Загрузка...</div>);
          }
          const res = await appStore.auth.loginPassport(passport, query);
          if (res) {
            return page.redirect('/');
          }
          throw 'Непонятная ошибка при входе в соцсеть';
        }
        return page
           .pushTitle('Регистрация через соц.сеть')
           .component(AuthPage, { type: 'signupPassport', passport, query });
      },
    },
    {
      path: '/logout',
      action({ appStore, page }) {
        if (__SERVER__) {
          return page
             .pushTitle('Logout')
             .component(<div>Загрузка...</div>);
        }
        appStore.auth.logout();
        return page.redirect('/');
      },
    },
  ],
};
