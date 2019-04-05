#!/bin/sh
# rm -rf bump.txt && \
rm -rf .babelrc && \
rm -rf .babelrc.js && \
cp ../../.babelrc.js . && \
rm -rf node_modules && \
npm i && \
mkdir -p node_modules && \
rm -rf release && \
rm -rf build && \
mkdir -p build && \
cp -R package.json build && \
cp -R package-lock.json build && \
cp -R node_modules build && \
cd build && \
npm link && \
npm link @lskjs/apiquery @lskjs/auth @lskjs/autobind @lskjs/build @lskjs/dashboard @lskjs/db @lskjs/downloads @lskjs/form @lskjs/i18 @lskjs/list @lskjs/log @lskjs/mailer @lskjs/mobx @lskjs/module @lskjs/permit @lskjs/reactapp @lskjs/scroll @lskjs/server @lskjs/tbot @lskjs/uapp @lskjs/ui @lskjs/upload @lskjs/utils && \
echo "OK"


