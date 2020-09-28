// export { default as discord } from './DiscordBotProvider';
// export { default as telegraf } from './TelegrafBotProvider';

export default {
  discord: () => import('./discord')
  telegram: () => import('./telegram'),
  slack: () => import('./slack'),
  twitter: () => import('./twitter'),
  vkontakte: () => import('./vkontakte'),
  // whatsapp: () => import('./whatsapp'),
};
