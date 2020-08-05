import flattenKeys from '@lskjs/utils/flattenKeys';
import routesTreeToExpressRouter from './runRoutes/routesTreeToExpressRouter';
import extractApi from './runRoutes/extractApi';
import getRoutesTree from './runRoutes/getRoutesTree';

export default function () {
  const log = (level, ...args) => (this.log ? this.log[level](...args) : console[level] && console[level](...args)); // eslint-disable-line no-console
  if (this.Api) {
    this.rootApi = new this.Api({ app: this });
    if (!this.rootApi) {
      log('warn', '!app.rootApi');
    }
  } else if (!this.rootApi) {
    log('warn', '!app.Api');
  }
  this.routes = getRoutesTree(extractApi(this.rootApi, {}));
  log(
    'log',
    'routes',
    flattenKeys(this.routes, [], (a) => a.join('')),
  );
  this.express.use(routesTreeToExpressRouter(this.routes));
  return this.express;
}
