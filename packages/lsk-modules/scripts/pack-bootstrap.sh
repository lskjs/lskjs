#!/bin/sh
rm -rf .babelrc && \
cp ../../.babelrc . && \
pwd && \
npm i && \
rm -rf build && \
mkdir -p build && \
cp -R node_modules build