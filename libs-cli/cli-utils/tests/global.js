/* eslint-disable no-console */
const { getPaths, getNpmGlobal } = require('../utils');

console.log('getNpmGlobal()');
console.log(getNpmGlobal());
console.log('getPaths()');
console.log(getPaths());

console.log('getPaths({ nodemodules: 1 })');
console.log(getPaths({ nodemodules: 1 }));
