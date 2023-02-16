export default {
  youtube: () => import('./YoutubeStrategy'),
  vkontakte: () => import('./VkontakteStrategy'),
  facebook: () => import('./FacebookStrategy'),
  telegram: () => import('./TelegramStrategy'),
};
