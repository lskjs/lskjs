import React from 'react';
import Loading from 'lsk-general/General/Loading';

export default {
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
        const { uapp, query, page, api, } = params;
        const { AuthPage, BindPage } = uapp.modules.auth.components;
        let passport;
        try {
          const { data } = api.fetch('/api/module/auth/passport/getByToken', query);
          // passport = (await getData(params)).passport;
          passport = data;
        } catch (err) {
          throw err;
        }
        if (__SERVER__) {
          return page
            .pushTitle('Подключение соц.сети')
            .component(<Loading full />);
        }
        const isAuth = await uapp.auth.isAuthAsync();
        if (isAuth) {
          return page
            .pushTitle('Подключение социальной сети')
            .component(BindPage, { passport, query });
        }
        if (passport.userId) {
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
             .component(<Loading full />);
        }
        uapp.auth.logout();
        return page.redirect('/');
      },
    },
  ],
};
