// import HomePage from './HomeWWS'
import ErrorPage from './ErrorPage';
import config from '../../config/client';

export default {
  path: '/',
  children: [
    {
      path: '/',
      ...require('./home').default,
    },
    {
      path: '/admin',
      ...require('./admin').default,
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
      path: '*',
      action() {
        throw 'Not found';
      },
    },
  ],
  async action({ next, ctx }) {
    let route;
    try {
      route = await next();
    } catch (err) {
      console.log('err!!!!!!!!!!!!!!!!!!!!!!!!!!!!', err);
      route = {
        title: `!!!Error: ${err}`,
        component: <ErrorPage>{`Error: ${err}`}</ErrorPage>,
      };
    }
    if (!route) route = {};
    route.title = `${route.title || 'Untitled Page'} - ${config.siteTitle}`;
    route.description = route.description || config.siteTitle;
    return route;
  },
};
