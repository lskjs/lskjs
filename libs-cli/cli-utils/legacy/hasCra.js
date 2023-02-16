const fs = require('fs');
const { packagePath } = require('./packagePath');

const hasCra = () => fs.existsSync(packagePath('cra'));

module.exports = {
  hasCra,
};
