import ErrorLayout from './ErrorLayout';
import MainLayout from './MainLayout';
import config from '../../config/client';

export default {
  path: '/',
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
  async action({ next, page }) {
    return page
    .pushTitle(config.siteTitle || 'Site Name')
    .layout(MainLayout)
    .errorLayout(ErrorLayout)
    .next(next);
  },
};
