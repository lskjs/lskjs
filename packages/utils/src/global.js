const globalOrWindow = typeof window !== 'undefined' ? window : global;
globalOrWindow.__SERVER__ = typeof window === 'undefined';
globalOrWindow.__CLIENT__ = !globalOrWindow.__SERVER__;
if (typeof __DEV__ === 'undefined' && !globalOrWindow.__DEV__) {
  if (globalOrWindow.__SERVER__) {
    globalOrWindow.__DEV__ = process.env.NODE_ENV !== 'production';
  } else {
    globalOrWindow.__DEV__ = false;
  }
}
globalOrWindow.__DEV__ = !!globalOrWindow.__DEV__;
globalOrWindow.__PROD__ = !globalOrWindow.__DEV__;
if (!globalOrWindow.__IMAGE__) {
  if (globalOrWindow.__SERVER__) {
    globalOrWindow.__IMAGE__ = process.env.IMAGE || process.env.__IMAGE || process.env.__IMAGE__ || process.env.CONTAINER_IMAGE; // eslint-disable-line max-len
  }
  if (!globalOrWindow.__IMAGE__) {
    globalOrWindow.__IMAGE__ = 'image';
  }
}
if (!globalOrWindow.__VERSION__) {
  if (globalOrWindow.__SERVER__) {
    globalOrWindow.__VERSION__ = process.env.VERSION || process.env.__VERSION || process.env.__VERSION__;
  }
  if (!globalOrWindow.__VERSION__) {
    globalOrWindow.__VERSION__ = '00000000';
  }
}
if (!globalOrWindow.__INSTANCE__) {
  if (globalOrWindow.__SERVER__) {
    globalOrWindow.__INSTANCE__ = process.env.INSTANCE || process.env.__INSTANCE || process.env.__INSTANCE__;
  }
  if (!globalOrWindow.__INSTANCE__) {
    globalOrWindow.__INSTANCE__ = '1';
  }
}
if (!globalOrWindow.__STAGE__) {
  if (globalOrWindow.__SERVER__) {
    globalOrWindow.__STAGE__ = process.env.STAGE || process.env.__STAGE || process.env.__STAGE__;
  }
  if (!globalOrWindow.__STAGE__) {
    globalOrWindow.__STAGE__ = 'development';
  }
}
