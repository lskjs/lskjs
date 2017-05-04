import Loading from '~/App/components/Loading';

import CabinetLayout from './CabinetLayout';
import Dashboard from './Dashboard';
import User from './User';
import Users from './Users';
import Settings from './Settings';
import Messages from './Messages';
import Comments from './Comments';

export default uapp => ({
  uapp,
  async action({ next, page }) {
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
        return page.redirect('/cabinet/dashboard');
      },
    },
    {
      path: '/profile',
      async action({ page, user }) {
        return page
          .redirect(`/cabinet/user/${user._id}`);
      },
    },
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
      path: '/guidelines',
      async action({ page }) {
        if (__CLIENT__) {
          const Guidelines = require('./Guidelines').default;
          return page
            .meta({
              title: 'Гайдлайны',
              url: '/cabinet/guidelines',
            })
            .component(Guidelines, {});
        }
        return <Loading full />;
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
      path: '/user/:id',
      async action({ page, uapp }, { id }) {
        const user = await uapp.models.User.getById(id);
        // const { Messages } = uapp.modules.chat.components;
        return page
          .meta({
            title: 'Профиль пользователя',
            description: user.fullName,
            url: `/cabinet/user/${id}`,
          })
          .component(User, { user });
      },
    },
    {
      path: '/settings',
      async action({ page, uapp }) {
        const passports = await uapp.modules.auth.stores.Passports.getPassports();
        return page
          .meta({
            title: 'Профиль пользователя',
            description: 'Профиль пользователя',
            url: '/cabinet/profile',
          })
          .meta({
            title: 'Редактирование профиля',
            description: 'Старница настроек',
            url: '/cabinet/settings',
          })
          .component(Settings, { passports });
      },
    },
    {
      path: '/friends',
      ...require('./Friends/index').default,
    },
    {
      path: '/users',
      async action({ page, uapp }) {
        const users = new uapp.stores.Users();
        await users.fetchUsers(20);
        return page
          .meta({
            title: 'Список пользователей',
            description: 'Все пользователи',
            url: '/cabinet/users',
          })
          .component(Users, { users });
      },
    },
    {
      path: '/posts',
      posts: uapp.modules.posts,
      router: uapp.modules.posts.router,
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
    {
      path: '/offers',
      ...require('./Offers/index').default,
    },
    {
      path: '*',
      action() {
        throw 'Page not found in cabinet';
      },
    },
  ],
});
