#!/usr/bin/env bash

# preinit
rm -rf .babelrc .babelrc.js .eslintrc.js styleguide.config.js tsconfig.json tsconfig.types.json .storybook bump.txt && \
rsync -avEp ../../tsconfig.json ../../tsconfig.types.json . && \
rsync -avEp  ../../scripts/assets/files/ . 

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
../../node_modules/npm-check-updates/bin/cli.js -u --dep=prod,dev,peer,optional "$NCU_PACKAGES"  && \
npm install
# ../../node_modules/npm-check-updates/bin/ncu -u --dep=prod,dev,peer,optional  && \