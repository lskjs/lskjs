export default (ctx) => {
  return {
    vkontakte: require('./vkontakte').default(ctx),
    youtube: require('./youtube').default(ctx),
  };
};
