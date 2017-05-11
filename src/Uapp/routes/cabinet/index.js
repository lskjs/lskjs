import CabinetLayout from './CabinetLayout';
import Dashboard from './Dashboard';
import Messages from './Messages';

// export default uapp => {
//   console.log(uapp.modules.user.router);
// ...uapp.modules.user.router.children,
// }
export default uapp => ({
  async action({ next, page }) {
    // console.log('uapp.modules.user.router.children', uapp.modules.user.router.children);
    return page
      .isAuth()
      .meta({
        title: 'Кабинет',
        description: 'Личный кабинет',
        url: '/cabinet',
      })
      .layout(CabinetLayout)
      .next(next);
  },
  children: [
    {
      path: '/',
      async action({ page }) {
        return page.redirect('/cabinet/profile');
      },
    },
    ...(!uapp.modules.user ? [] : uapp.modules.user.router.children),
    {
      path: '/dashboard',
      async action({ page }) {
        return page
          .meta({
            title: 'Дешборд',
            url: '/cabinet/dashboard',
          })
          .component(Dashboard, {});
      },
    },
    {
      path: '/friends',
      ...require('./Friends/index').default,
    },
    !uapp.modules.posts ? null : {
      path: '/posts',
      ...uapp.modules.posts.router,
    },
    {
      path: '/messages',
      async action({ page }) {
        return page
          .meta({
            title: 'Сообщения',
            description: 'Все сообщения',
            url: '/cabinet/messages',
          })
          .component(Messages, {});
      },
    },
    !uapp.modules.offer ? null : {
      path: '/offers',
      ...uapp.modules.offer.router, //.children,
      // ...require('./Offers/index').default,
    },
    {
      path: '*',
      action() {
        throw 'Page not found in cabinet';
      },
    },
  ].filter(a => a),
});
