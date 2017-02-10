import polyfill from 'lego-starter-kit/utils/polyfill';
// import App from 'lego-starter-kit/MobxApp'
import App from 'lego-starter-kit/ReactApp';
import config from './config';
polyfill();
const ctx = { config };
const app = new App(ctx);
app.run().then(() => {
  console.log(`🎃  The server is running at http://127.0.0.1:${app.config.port}/ [${global.timing()}ms]`);
});
