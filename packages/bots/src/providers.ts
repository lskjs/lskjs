export default {
  telegram: () => import('@lskjs/bots-provider-telegram'), //
  discord: () => import('@lskjs/bots-provider-discord'), //
  clubhouse: () => import('@lskjs/bots-provider-clubhouse'), //
  slack: () => import('@lskjs/bots-provider-slack'),
  twitter: () => import('@lskjs/bots-provider-twitter'),
  instagram: () => import('@lskjs/bots-provider-instagram'),
  vk: () => import('@lskjs/bots-provider-vk'),
  whatsapp: () => import('@lskjs/bots-provider-whatsapp'),
};
