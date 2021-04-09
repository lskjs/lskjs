import AsyncRouter from '../../AsyncRouter';
import iterateRoute from './iterateRoute';

export default (routesTree) => {
  const router = iterateRoute(routesTree);
  const asyncRouter = AsyncRouter();
  asyncRouter.use(router);

  return asyncRouter;
};
