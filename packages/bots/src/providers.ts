export default {
  // @ts-ignore
  telegram: () => import('@lskjs/bots-provider-telegram'), //
  // @ts-ignore
  discord: () => import('@lskjs/bots-provider-discord'), //
  // @ts-ignore
  clubhouse: () => import('@lskjs/bots-provider-clubhouse'), //
  // @ts-ignore
  slack: () => import('@lskjs/bots-provider-slack'),
  // @ts-ignore
  twitter: () => import('@lskjs/bots-provider-twitter'),
  // @ts-ignore
  instagram: () => import('@lskjs/bots-provider-instagram'),
  // @ts-ignore
  vk: () => import('@lskjs/bots-provider-vk'),
  // @ts-ignore
  whatsapp: () => import('@lskjs/bots-provider-whatsapp'),
};
