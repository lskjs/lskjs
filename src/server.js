import ready from 'lego-starter-kit/utils/polyfill';
import App from './App';
// import Uapp from './Uapp';
import config from './config';
ready();
const app = new App({ config });
app.start();

export default app;
