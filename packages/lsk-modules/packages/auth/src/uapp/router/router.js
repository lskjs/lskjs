import React from 'react';

export default {
  children: [
    {
      path: '/logout',
      action({ uapp, page }) {
        if (__SERVER__) {
          return page
            .meta({
              title: 'Logout',
            })
            .loading();
        }
        uapp.auth.logout();
        return page.redirect('/');
      },
    },
  ],
};
// export default {
//   children: [
//     {
//       path: '',
//       async action({ page, uapp }) {
//         return page.redirect('/auth/login');
//       },
//     },
//     {
//       path: '/login',
//       async action({ page, uapp }) {
//         const AuthPage = await import('../components/AuthPage');
//         return page
//           .meta({
//             title: 'Вход',
//           })
//           .component(AuthPage, { type: 'login' });
//       },
//     },
//     {
//       path: '/recovery',
//       action({ page, uapp }) {
//         return page
//           .meta({
//             title: 'Восстановление пароля',
//           })
//           .component(import('../components/AuthPage'), { type: 'recovery' });
//       },
//     },
//     {
//       path: '/signup',
//       action({ page, uapp }) {
//         return page
//           .meta({
//             title: 'Signup',
//           })
//           .component(import('../components/AuthPage'), { type: 'signup' });
//       },
//     },
//     {
//       path: '/passport',
//       async action(params) {
//         const {
//           uapp, query, page, api,
//         } = params;
//         let passport;
//         try {
//           const { data } = await api.fetch('/api/module/auth/passport/getByToken', {
//             method: 'GET',
//             qs: query,
//           });
//           // passport = (await getData(params)).passport;
//           passport = data;
//         } catch (err) {
//           throw err;
//         }
//         if (__SERVER__) {
//           return page
//             .meta({
//               title: 'Подключение соц.сети',
//             })
//             .loading();
//         }
//         const isAuth = await uapp.auth.isAuthAsync();
//         if (isAuth) {
//           return page
//             .meta({
//               title: 'Подключение социальной сети',
//             })
//             .component(import('../components/BindPage'), { passport, query });
//         }
//         if (passport.userId) {
//           const res = await uapp.auth.loginPassport({ p: query.p });
//           if (res) {
//             return page.redirect('/');
//           }
//           throw 'Непонятная ошибка при входе в соцсеть';
//         }
//         return page
//           .meta({
//             title: 'Регистрация через соц.сеть',
//           })
//           .component(import('../components/AuthPage'), { type: 'signupPassport', passport, query });
//       },
//     },
//     {
//       path: '/logout',
//       action({ uapp, page }) {
//         if (__SERVER__) {
//           return page
//             .meta({
//               title: 'Logout',
//             })
//             .loading();
//         }
//         uapp.auth.logout();
//         return page.redirect('/');
//       },
//     },
//   ],
// };
