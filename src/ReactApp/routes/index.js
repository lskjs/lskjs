// import InitPage from './InitPage'
// import IndexPage from './IndexPage'
// import { LoginPage, RegisterPage } from './AuthPage'
// import ErrorPage from './ErrorPage'
// import App from '../App'
import HomePage from './HomePage';
import CounterPage from './CounterPage';
export default {
  path: '/',
  children: [
    {
      path: '/',
      async action({ page }) {
        return page
        .title('HomePage')
        .component(<HomePage />);
      },
    },
    {
      path: '/static',
      async action({ page }) {
        return page
          .title('HomePage')
          .component(<div>static</div>);
      },
    },
    {
      path: '/counter',
      async action({ page }) {
        return page
          .title('CounterPage')
          .component(<CounterPage />);
      },
    },
    {
      path: '*',
      action({ page }) {
        return page
          // .status(404)
          .title('Page Not Found')
          .component(<div>Page Not Found</div>);
      },
    },
  ],
};
