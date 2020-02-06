#!/usr/bin/env bash

# pre link
rm -rf release && \
rm -rf build && mkdir -p build && \

rm -rf node_modules && npm i && mkdir -p node_modules && \
cp -R package.json build && \
cp -R package-lock.json build && \
if [ "$NODE_ENV" != "production" ]
then
  ../../node_modules/npm-check-updates/bin/ncu --dep=prod,dev,peer,optional && \
  npm run bootstrap:nodemodules && \
  npm run link:me
else
  true
fi && \

echo "OK"


