import React from 'react';
// import AuthPage from './AuthPage';
import getData from './getData';

export default {
  // action({ next, page }) {
  //   // if (__PROD__ && __SERVER__) {
  //   //   return page
  //   //     .pushTitle('Loading')
  //   //     .component('Loading');
  //   // }
  //   return page
  //     .pushTitle('Авторизация')
  //     .layout(AuthLayout)
  //     .next(next);
  // },
  children: [
    {
      path: '/(login|)',
      action({ page, uapp }) {
        const { AuthPage } = uapp.modules.auth.components;
        return page
          .pushTitle('Вход')
          .component(AuthPage, { type: 'login' });
      },
    },
    {
      path: '/recovery',
      action({ page, uapp }) {
        const { AuthPage } = uapp.modules.auth.components;
        return page
          .pushTitle('Восстановление пароля')
          .component(AuthPage, { type: 'recovery' });
      },
    },
    {
      path: '/signup',
      action({ page, uapp }) {
        const { AuthPage } = uapp.modules.auth.components;
        return page
          .pushTitle('Signup')
          .component(AuthPage, { type: 'signup' });
      },
    },
    {
      path: '/passport',
      async action(params) {
        const { uapp, query, page } = params;
        const { AuthPage } = uapp.modules.auth.components;
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
          const res = await uapp.auth.loginPassport({ p: query.p });
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
      action({ uapp, page }) {
        if (__SERVER__) {
          return page
             .pushTitle('Logout')
             .component(<div>Загрузка...</div>);
        }
        uapp.auth.logout();
        return page.redirect('/');
      },
    },
  ],
};
