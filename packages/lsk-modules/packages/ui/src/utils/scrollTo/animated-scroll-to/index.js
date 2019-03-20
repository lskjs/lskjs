let exports = {};

if (__SERVER__) exports = require('./animated-scroll-to.server').default;
if (__CLIENT__) exports = require('./animated-scroll-to.client').default;

module.exports = exports;