#!/bin/sh
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# pre link
rm -rf release && \
rm -rf build && mkdir -p build && \

# cd build && npm link && cd .. \

rm -rf node_modules &&  npm i && mkdir -p node_modules && \
cp -R package.json build && \
cp -R package-lock.json build && \
cp -R node_modules build && \

# $DIR/package-link.sh && \
# cp -R node_modules build && \
echo "OK"


