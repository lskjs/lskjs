import polyfill from 'lego-starter-kit/utils/polyfill';
// import App from 'lego-starter-kit/CoreApp'
import App from 'lego-starter-kit/ReactApp';
import config from './config/client';
polyfill();
const ctx = { config };
const app = new App(ctx);
app.start()

if (module.hot) {
  app.hot = module.hot;
  // module.hot.accept('./router');
}
export default app;
