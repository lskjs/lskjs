// const path = require('path');
// const { execSync } = require('child_process');
const globalPrefix = require('global-prefix');

const getNpmGlobal = () =>
  // let str = execSync('npm root -g');
  // if (!str) return null;
  // str = str.toString().trim();
  // console.log({str})
  // console.log({globalPrefix})
  // if (!str) return null;
  // return path.resolve(`${str}/..`);
  `${globalPrefix}/lib`;

module.exports = {
  getNpmGlobal,
};
