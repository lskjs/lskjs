// console.log('SERVER RUN123');
// let i = 3;
// setInterval(() => {
//   console.log(i++);
// }, 1000);
// const app = {
//   express: {
//     handle() {
//       console.log('handle');
//     }
//   },
//   start() {
//     console.log('start');
//   },
//   stop() {
//     console.log('stop');
//   },
// }
// if (module.hot) {
//   app.hot = module.hot;
// }
// export default app;
// // asdadas
import polyfill from 'lego-starter-kit/utils/polyfill';
// import App from 'lego-starter-kit/CoreApp'
import App from 'lego-starter-kit/ReactApp';
import config from './config';
polyfill();
config.extendEnv(process.env.CONFIG_PATH || undefined);
const ctx = { config };
const app = new App(ctx);
app.start()

const qwe = 1233;

if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./Uapp');
}
export default app;
