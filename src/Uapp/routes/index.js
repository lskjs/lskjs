import ErrorLayout from './ErrorLayout';
import MainLayout from './MainLayout';

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
      ...require('./auth').default,
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
