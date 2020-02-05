const json = require(process.cwd() + '/package.json'); // eslint-disable-line
const baseJson = require(__dirname + '/package-merge.json'); // eslint-disable-line

const newJson = {
  ...baseJson,
  ...json,
  scripts: {
    ...(baseJson.scripts || {}),
    ...(json.scripts || {}),
  },
};

require('fs').writeFileSync('./package.json', JSON.stringify(newJson, null, 2));
