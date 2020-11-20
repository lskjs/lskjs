#!/usr/bin/env bash

# preinit
rm -rf .babelrc && rm -rf .babelrc.js && cp ../../.babelrc.js . && \
rm -rf .eslintrc.js && cp ../../.eslintrc.js .eslintrc.js && \
rm -rf styleguide.config.js && cp ../../styleguide.config.js . && \
rm -rf tsconfig.json && cp ../../tsconfig.json . && \
# rm -rf .gitignore && \
rm -rf .storybook && cp -R ../../scripts/assets/.storybook/ .storybook 

# update package \
node ../../scripts/package-merge.js 

if [ -d ./cra ]
then
  cp -R ../../scripts/assets/cra/* cra
else
  true
fi

# update deps
NCU_PACKAGES=`node -e "console.log(require('../../.lskjs.js').ncu.packages || '@nothing')"`
echo ncu -u --dep=prod,dev,peer,optional "$NCU_PACKAGES"  && \
../../node_modules/npm-check-updates/bin/ncu -u --dep=prod,dev,peer,optional "$NCU_PACKAGES"  && \
npm install
# ../../node_modules/npm-check-updates/bin/ncu -u --dep=prod,dev,peer,optional  && \