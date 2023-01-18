/* eslint-disable no-console */
const { getPaths, findPath } = require('../../../../../src');

console.log('getPaths()');
console.log(getPaths());

console.log('getPaths({ nodemodules: 1 })');
console.log(getPaths({ nodemodules: 1 }));

console.log('findPath({ name: "file-packages.txt" })');
console.log(findPath({ name: 'file-packages.txt' }));
