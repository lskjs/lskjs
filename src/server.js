import polyfill from './utils/polyfill';
import App from './ReactApp';
import config from './config';

polyfill();
config.extendEnv(process.env.CONFIG_PATH || undefined);
const ctx = { config };
const app = new App(ctx);
app.start();

if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./Uapp');
}
export default app;
