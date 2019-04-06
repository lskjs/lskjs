#!/bin/sh
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

rm -rf .babelrc && \
rm -rf .babelrc.js && \
cp ../../.babelrc.js . && \
rm -rf .eslintrc.js && \
cp ../../.eslintrc-package.js .eslintrc.js && \
rm -rf node_modules && \
npm i && \
mkdir -p node_modules && \
rm -rf release && \
rm -rf build && \
mkdir -p build && \
cp -R package.json build && \
cp -R package-lock.json build && \
cd build && \
npm link && \
$DIR/package-link.sh && \
cd .. && \
cp -R node_modules build && \
echo "OK"


