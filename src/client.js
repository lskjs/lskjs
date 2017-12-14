import ready from 'lego-starter-kit/utils/polyfill';
import 'react-bootstrap-card/react-bootstrap-polyfill';
import App from './App';
import Uapp from './Uapp';
import config from './config';

ready();
const app = new App({ config, Uapp });
app.start();
global.app;

if (module.hot) {
  module.hot.accept('./App', () => {
    console.log('module.hot.accept ./App');
  });
  module.hot.accept('./Uapp', () => {
    const Uapp = require('./Uapp').default;
    const app = new App({ config, Uapp });
    app.start();
    global.app;
  });
}
