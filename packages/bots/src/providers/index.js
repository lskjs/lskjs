// export { default as discord } from './DiscordBotProvider';
// export { default as telegraf } from './TelegrafBotProvider';

export default {
  telegram: () => import('./telegram'), //
  discord: () => import('./discord'), //
  slack: () => import('./slack'),
  twitter: () => import('./twitter'),
  vkontakte: () => import('./vkontakte'),
  instagram: () => import('./instagram'),
  whatsapp: () => import('./whatsapp'),
};
