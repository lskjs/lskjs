export default function () {
  return {
    AuthPage: require('./AuthPage').default,//(...arguments),
    BindPage: require('./BindPage').default,//(...arguments),
  };
}
