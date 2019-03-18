const exports = {};

if (__SERVER__) exports.default = require('./animated-scroll-to.server').default;
if (__CLIENT__) exports.default = require('./animated-scroll-to.client').default;
    
module.exports = exports;