require('@babel/polyfill');
const cnfg = require('../tools/webpack.config')[0];
const genDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config.js");

module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);
    config.module.rules = cnfg.module.rules;
    return config;
};