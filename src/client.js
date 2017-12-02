import ready from 'lego-starter-kit/utils/polyfill';
import 'react-bootstrap-card/react-bootstrap-polyfill';
import App from './App';
import Uapp from './Uapp';
import config from './config';

// for react only update
// if(module.hot) {
//     module.hot.accept();
// }
//
// if(!global.__APP) {
//     ready();
//     const app = new App({ config, Uapp });
//     global.__APP = app;
//     app.start();
// } else {
//     require('./Uapp/routes').default(global.__APP.uapp)
//     global.__APP.hmrUpdate();
// }

ready();
const app = new App({ config, Uapp });
app.start();

if (module.hot) {
  module.hot.accept();
}
