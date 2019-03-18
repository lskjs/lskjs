const fs = require('fs');
const path = require('path');

const getAllFiles = dir =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);

const pkgs = getAllFiles('./src').filter(item => item.includes('package.json'));

pkgs.forEach((item) => {
  const pkg = require('./' + item);
  const folder = path.dirname(item);
  let str = '';
  if (pkg.main && pkg.browser) {
    str = `const exports = {};

if (__SERVER__) exports.default = require('./${pkg.main}').default;
if (__CLIENT__) exports.default = require('./${pkg.browser}').default;
    
module.exports = exports;`;
  } else if (pkg.main) {
    str = `export { default } from './${pkg.main}';`;
  }
  const pathToIndex = path.join(folder, 'index.js');
  try {
    const status = fs.statSync(pathToIndex);
    fs.unlinkSync(item);
  } catch (e) {
    fs.writeFileSync(pathToIndex, str);
    fs.unlinkSync(item);
  }
});
