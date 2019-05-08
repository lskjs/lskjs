#!/usr/bin/env bash

# preinit
rm -rf .babelrc && rm -rf .babelrc.js && cp ../../.babelrc.js . && \
rm -rf .eslintrc.js && cp ../../.eslintrc-package.js .eslintrc.js && \
rm -rf .storybook && cp -R ../../.storybook/.storybook-package .storybook && \
rm -rf .gitignore && cp ../../.gitignore . && \
rm -rf styleguide.config.js && cp ../../styleguide.config.js . && \
rm -rf tsconfig.json && cp ../../tsconfig.json . && \

# update package
node ../../scripts/package-merge.js && \

# update deps
../../node_modules/npm-check-updates/bin/ncu --dep=prod,dev '/^@lskjs/.*$/' -u && \
../../node_modules/npm-check-updates/bin/ncu --dep=peer,optional '/^@lskjs/.*$/' -u && \
npm install
