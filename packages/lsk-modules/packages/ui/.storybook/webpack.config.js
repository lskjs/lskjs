const cfg = require('../tools/webpack.config')[0];
cfg.module.rules[0].options = require('../.babelrc.js');
cfg.module.rules[0].include = '/home/ga2mer/mygit/lsk/modules/packages/ui'
cfg.module.rules[0].exclude = '/home/ga2mer/mygit/lsk/modules/packages/node_modules'
// module.exports = cfg;
module.exports = ({ config }) => {
    config.module.rules = cfg.module.rules;
    config.module.rules[1].loader.splice(0, 1);
    config.module.rules[2].loader.splice(0, 1);
    config.module.rules[3].loader.splice(0, 1);
    config.module.rules[4].loader.splice(0, 1);
    config.plugins[1] = cfg.plugins[1];
    return config;
};
