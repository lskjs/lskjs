const json = require(process.cwd() + '/package.json'); // eslint-disable-line
const baseJson = require(__dirname + '/package.json'); // eslint-disable-line

const newJson = {
  ...json,
  ...baseJson,
  scripts: {
    ...(json.scripts || {}),
    ...(baseJson.scripts || {}),
  },
};

require('fs').writeFileSync('./package.json', JSON.stringify(newJson, null, 2));
