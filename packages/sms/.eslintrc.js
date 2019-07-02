module.exports = {
  ...require('../../.eslintrc.js'),
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": [{
        "rootPathPrefix": "~",
        "rootPathSuffix": "./src"
      }]
    },
  }
}
