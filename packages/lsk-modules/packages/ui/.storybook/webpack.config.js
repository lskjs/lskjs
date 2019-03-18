const cfg = require('../tools/webpack.config')[0];
cfg.module.rules[0].options = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true  }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-function-bind",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-transform-modules-commonjs",
        "emotion"
    ]
};
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
