#!/bin/sh
pwd && \
rm -rf .babelrc && \
cp ../../.babelrc . && \
rm -rf node_modules && \
npm i && \
rm -rf release && \
rm -rf release && \
rm -rf build && \
mkdir -p build && \
cp -R package.json build && 
cp -R package-lock.json build && 
cp -R node_modules build && 
cd build && \
pwd && \
npm link