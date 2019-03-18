const exports = {};

if (__SERVER__) exports.default = require('./antd-calendar.server').default;
if (__CLIENT__) exports.default = require('./antd-calendar.client').default;
    
module.exports = exports;