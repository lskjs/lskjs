#!/usr/bin/env bash
cd build && npm link && cd ..
npx @lskjs/linkall
rm -rf build/node_modules && cp -R node_modules build
