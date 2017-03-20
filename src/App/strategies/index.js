export default (ctx) => {
  return {
    Vkontakte: require('./vk').default(ctx),
  };
};
