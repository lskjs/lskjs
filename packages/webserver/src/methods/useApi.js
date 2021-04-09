import flattenKeys from '@lskjs/utils/flattenKeys';

import extractApi from './runRoutes/extractApi';
import getRoutesTree from './runRoutes/getRoutesTree';
import routesTreeToExpressRouter from './runRoutes/routesTreeToExpressRouter';

const join = (items) => {
  let finalMethod;
  const finalPath = items
    .map((item) => {
      const [api, method] = item.split(' ').reverse();
      finalMethod = method;
      return api;
    })
    .join('');
  return [finalMethod, finalPath].filter(Boolean).join('');
};

export default async function (Api) {
  if (!Api) throw '!Api';
  const path = '/';
  this.rootApi = new Api(this, { path, config: this.config.api });
  await this.rootApi.__run();
  this.routes = await getRoutesTree.bind(this.rootApi)(await extractApi(this.rootApi, {}), path);
  if (this.debug) {
    this.log.trace('routes', flattenKeys(this.routes, [], join));
  }
  this.express.use(routesTreeToExpressRouter(this.routes));
  return this.express;
}
