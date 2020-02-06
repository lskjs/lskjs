#!/usr/bin/env bash

# preinit
rm -rf .babelrc && rm -rf .babelrc.js && cp ../../.babelrc.js . && \
rm -rf .eslintrc.js && cp ../../.eslintrc.js .eslintrc.js && \
rm -rf styleguide.config.js && cp ../../styleguide.config.js . && \
rm -rf tsconfig.json && cp ../../tsconfig.json . && \
rm -rf .gitignore && \
rm -rf .storybook && cp -R ../../.storybook/.storybook-package .storybook 

# update package \
node ../../scripts/package-merge.js 

# update deps
../../node_modules/npm-check-updates/bin/ncu -u --save-exact --dep=prod,dev,peer,optional '/^@lskjs/.*$/' && \
npm install
# ../../node_modules/npm-check-updates/bin/ncu -u --save-exact --dep=prod,dev,peer,optional  && \