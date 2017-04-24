import ErrorLayout from './ErrorLayout';
import MainLayout from './MainLayout';
import AuthRouter from '../../modules/auth/router'; // TODO: isuvorov не знаю как иначе

export default {
  path: '/',
  async action({ next, uapp, page }) {
    return page
    .meta(uapp.config && uapp.config.site || {})
    .layout(MainLayout)
    .errorLayout(ErrorLayout)
    .next(next);
  },
  children: [
    {
      path: '/',
      ...require('./home').default,
    },
    {
      path: '/auth',
      async action({ next, page }) {
        return page
          .pushTitle('Авторизация')
          .next(next);
      },
      ...AuthRouter,
    },
    {
      path: '/cabinet',
      ...require('./cabinet').default,
    },
    {
      path: '/admin',
      ...require('./admin').default,
    },
    {
      path: '*',
      action() {
        throw 'Not found';
      },
    },
  ],
};
