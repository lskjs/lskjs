import Loading from 'lsk-general/General/Loading';

import Comments from './Comments';

export default {
  // async action({ next, page }) {
  //   return page
  //     .isAuth()
  //     .meta({
  //       title: 'Кабинет',
  //       description: 'Личный кабинет',
  //       url: '/cabinet',
  //     })
  //     .layout(CabinetLayout)
  //     .next(next);
  // },
  children: [
    {
      path: '/',
      async action({ page }) {
        console.log({ page });
        // return page.redirect('/cabinet/profile');
        return page.redirect('/demo/guidelines');
      },
    },
    {
      path: '/guidelines',
      async action({ page }) {
        const p = page
          .meta({
            title: 'Гайдлайны',
            url: '/cabinet/guidelines',
          });
        if (__SERVER__) return p.component(Loading, { full: true });
        return page
          .component(require('./Guidelines').default, {});
      },
    },
    {
      path: '/comments',
      async action({ page }) {
        return page
          .meta({
            title: 'Комментарии',
            url: '/cabinet/comments',
          })
          .component(Comments, {});
      },
    },
    {
      path: '*',
      action() {
        throw 'Page not found in cabinet';
      },
    },
  ],
};
