#!/bin/sh
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# pre link
rm -rf release && \
rm -rf build && mkdir -p build && \

rm -rf node_modules && npm i && mkdir -p node_modules && \
cp -R package.json build && \
cp -R package-lock.json build && \
npm run bootstrap:nodemodules && \
npm run link:me && \

echo "OK"


