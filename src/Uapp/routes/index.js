if (__SERVER__ && __DEV__) {
  module.exports = {
    default: {
      path: '(.*)',
      action({ page }) {
        return page.loading();
      },
    },
  };
} else {
  module.exports = require('./router');
}
