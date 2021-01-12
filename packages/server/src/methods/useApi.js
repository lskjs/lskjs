import flattenKeys from '@lskjs/utils/flattenKeys';
import routesTreeToExpressRouter from './runRoutes/routesTreeToExpressRouter';
import extractApi from './runRoutes/extractApi';
import getRoutesTree from './runRoutes/getRoutesTree';

export default async function (Api) {
  if (!Api) throw '!Api';
  const path = '/';
  // if (!this.getRoutesTree) this.getRoutesTree = getRoutesTree.bind(this);
  // const log = (level, ...args) => (this.log ? this.log[level](...args) : console[level] && console[level](...args)); // eslint-disable-line no-console
  this.rootApi = new Api(this, { path, config: this.config.api });
  await this.rootApi.__run();
  this.routes = await getRoutesTree.bind(this.rootApi)(await extractApi(this.rootApi, {}), path);
  if (this.debug) {
    this.log.trace(
      'routes',
      flattenKeys(this.routes, [], (a) => a.join('')),
    );
  }
  this.express.use(routesTreeToExpressRouter(this.routes));
  return this.express;
}
