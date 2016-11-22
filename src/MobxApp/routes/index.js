
export default {
  path: '/',
  children: [
    {
      path: '*',
      action() {
        return {
          component: <div>Hello MobxApp</div>,
        }
      },
    },
  ],

  async action({ next }) {
    let route = await next() || {};

    route.title = `${route.title || 'Untitled Page'} - Lego Starter Kit`;
    route.description = route.description || '';

    return route;
  },
};
