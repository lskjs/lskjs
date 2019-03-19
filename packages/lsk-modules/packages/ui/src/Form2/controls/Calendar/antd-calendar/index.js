let exports = {};

if (__SERVER__) exports = require('./antd-calendar.server').default;
if (__CLIENT__) exports = require('./antd-calendar.client').default;

module.exports = exports;