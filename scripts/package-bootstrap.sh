#!/bin/sh
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# preinit
rm -rf .babelrc && rm -rf .babelrc.js && cp ../../.babelrc.js . && \
rm -rf .eslintrc.js && cp ../../.eslintrc-package.js .eslintrc.js && \
rm -rf .storybook && cp -R ../../.storybook/.storybook-package .storybook && \
rm -rf .gitignore && cp ../../.gitignore . && \

# pre link
rm -rf release && \
rm -rf build && mkdir -p build && \
cd build && npm link && cd .. \

rm -rf node_modules &&  npm i && mkdir -p node_modules && \
cp -R package.json build && \
cp -R package-lock.json build && \

$DIR/package-link.sh && \
cp -R node_modules build && \
echo "OK"


