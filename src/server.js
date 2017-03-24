import { wrap } from 'react-bootstrap-card';
import ready from 'lego-starter-kit/utils/polyfill';
import App from './App';
import config from './config';
wrap(require('react-bootstrap'));
ready();
const app = new App({ config });
app.start();
