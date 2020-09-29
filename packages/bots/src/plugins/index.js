export default () => ({
  CatsPlugin: () => import('./CatsPlugin'),
  DebugPlugin: () => import('./DebugPlugin'),
  ExamplePlugin: () => import('./ExamplePlugin'),
  PortalPlugin: () => import('./PortalPlugin'),
  DeathLetterPlugin: () => import('./DeathLetterPlugin'),
});
