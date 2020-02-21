export default (...args) => ({
  // base: require('./Strategy').default(...args),
  youtube: require('./YoutubeStrategy').default,
  vkontakte: require('./VkontakteStrategy').default,
  facebook: require('./FacebookStrategy').default,
  telegram: require('./TelegramStrategy').default,
});
