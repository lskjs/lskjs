export default (...args) => ({
  // base: require('./Strategy').default(...args),
  youtube: require('./YoutubeStrategy').default(...args),
  vkontakte: require('./VkontakteStrategy').default(...args),
  facebook: require('./FacebookStrategy').default(...args),
  telegram: require('./TelegramStrategy').default(...args),
});
