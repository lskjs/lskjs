import { wrap } from 'react-bootstrap-card';
import ready from 'lego-starter-kit/utils/polyfill';
import App from './App';
import config from './config/client';
wrap(require('react-bootstrap'));
ready();
const ctx = { config };
const app = new App(ctx);
app.start();
