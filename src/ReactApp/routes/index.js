// import InitPage from './InitPage'
// import IndexPage from './IndexPage'
// import { LoginPage, RegisterPage } from './AuthPage'
// import ErrorPage from './ErrorPage'
// import App from '../App'
import HomePage from './HomePage'
import CounterPage from './CounterPage'
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '/',
      async action() {
        return {
          title: 'HomePage',
          component: <HomePage />,
        };
      },
    },
    {
      path: '/static',
      async action() {
        return {
          title: 'StaticPage',
          component: <div>static</div>,
        };
      },
    },
    {
      path: '/counter',
      async action() {
        return {
          title: 'CounterPage',
          component: <CounterPage />,
        };
      },
    },
    // require('./home').default,
    // require('./contact').default,
    // require('./login').default,
    // require('./register').default,
    //
    // // place new routes before...
    // require('./content').default,

    {

      path: '*',

      action() {
        return {
          title: "Page Not Found",
          component: <div>Page Not Found</div>,
          status: 404,
        };
      },

    }
  ],

  async action({ next }) {
    let route;

    // Execute each child route until one of them return the result
    // TODO: move this logic to the `next` function
    // console.log('action');
    do {
      // console.log('do');

      route = await next();
    } while (!route);

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - Lego Starter Kit`;
    route.description = route.description || '';

    return route;
  },

};

// export default {
//   path: '/',
//   children: [
//     {
//       path: '/',
//       action() {
//         return <div>
//           Main Page
//         </div>
//       },
//     },
//   ],
//   async action({ next, render, context }) {
//     const component = await next();
//     if (component === undefined) return component;
//     return render(component)
//     //   <App context={context}>
//     //     {component}
//     //   </App>
//     // );
//   },
// };
