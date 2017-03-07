import CabientLayout from './CabinetLayout';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import FriendsPage from './FriendsPage';
import FriendsInRequestsPage from './FriendsPage/tabs/InRequests';
import FriendsOutRequestsPage from './FriendsPage/tabs/OutRequests';
import PostsPage from './PostsPage';
import MessagesPage from './MessagesPage';


export default {
  children: [
    {
      path: '/',
      async action({ ctx }) {
        const props = {
          title: 'Личный кабинет',
          description: 'Ваш профиль',
          siteTitle: ctx.config.siteTitle,
          children: <ProfilePage />,
        };
        return {
          title: props.title,
          component: <CabientLayout {...props} />,
        };
      },
    },
    {
      path: '/settings',
      async action({ ctx }) {
        const props = {
          title: 'Редактирование профиля',
          description: 'Старница настроек',
          siteTitle: ctx.config.siteTitle,
          children: <SettingsPage />,
        };
        props.breadcrumbs = [
          { key: 2, title: props.title, url: '/cabinet/settings' },
        ];
        return {
          title: props.title,
          component: <CabientLayout {...props} />,
        };
      },
    },
    {
      path: '/friends',
      children: [
        {
          path: '/',
          async action({ ctx }) {
            const props = {
              title: 'Друзья',
              description: 'Список ваших друзей',
              siteTitle: ctx.config.siteTitle,
              children: <FriendsPage />,
            };
            props.breadcrumbs = [
              { key: 2, title: props.title, url: '/cabinet/friends' },
            ];
            return {
              title: props.title,
              component: <CabientLayout {...props} />,
            };
          },
        },
        {
          path: '/in',
          async action({ ctx }) {
            const props = {
              title: 'Входящие заявки',
              description: 'Заявки в друзья',
              siteTitle: ctx.config.siteTitle,
              children: <FriendsInRequestsPage />,
            };
            props.breadcrumbs = [
              { key: 2, title: 'Друзья', url: '/cabinet/friends' },
              { key: 3, title: props.title, url: '/cabinet/friends/in' },
            ];
            return {
              title: props.title,
              component: <CabientLayout {...props} />,
            };
          },
        },
        {
          path: '/out',
          async action({ ctx }) {
            const props = {
              title: 'Исходящие заявки',
              description: 'Заявки в друзья',
              siteTitle: ctx.config.siteTitle,
              children: <FriendsOutRequestsPage />,
            };
            props.breadcrumbs = [
              { key: 2, title: 'Друзья', url: '/cabinet/friends' },
              { key: 3, title: props.title, url: '/cabinet/friends/out' },
            ];
            return {
              title: props.title,
              component: <CabientLayout {...props} />,
            };
          },
        },
      ],
    },
    {
      path: '/posts',
      async action({ ctx }) {
        const props = {
          title: 'Публикации',
          description: 'Посты созданные тобой',
          siteTitle: ctx.config.siteTitle,
          children: <PostsPage />,
        };
        props.breadcrumbs = [
          { key: 2, title: props.title, url: '/cabinet/posts' },
        ];
        return {
          title: props.title,
          component: <CabientLayout {...props} />,
        };
      },
    },
    {
      path: '/im',
      async action({ ctx }) {
        const props = {
          title: 'Сообщения',
          description: 'Все сообщения',
          siteTitle: ctx.config.siteTitle,
          children: <MessagesPage />,
        };
        props.breadcrumbs = [
          { key: 2, title: props.title, url: '/cabinet/im' },
        ];
        return {
          title: props.title,
          component: <CabientLayout {...props} />,
        };
      },
    },
    {
      path: '*',
      action() {
        throw 'Not found in cabinet'
      },
    },
  ],
  async action({ next }) {
    const route = await next();

    // route.component = <div>
    //   Cabinet header
    //   <hr />
    //   {route.component}
    // </div>
    return route;
  },

};
