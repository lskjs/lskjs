export default {
  telegram: () => import('./telegram'), //
  discord: () => import('./discord'), //
  slack: () => import('./slack'),
  twitter: () => import('./twitter'),
  instagram: () => import('./instagram'),
  vk: () => import('./vk'),
  whatsapp: () => import('./whatsapp'),
};
