import polyfill from 'lego-starter-kit/utils/polyfill';
// import App from 'lego-starter-skit/MobxApp'
import App from 'lego-starter-kit/ReactApp';
import config from './config/client';
polyfill();
const ctx = { config };
const app = new App(ctx);
app.run().then(() => {
  console.log(`🎃  The client is running at http://127.0.0.1/ [${global.timing()}ms]`);
});
