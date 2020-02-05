#!/usr/bin/env bash
DIST=${DIST:-build}
echo "DIST=$DIST"
BUILD_PARAMS=${BUILD_PARAMS:---copy-files}
echo "BUILD_PARAMS=$BUILD_PARAMS"

mkdir -p ${DIST} && \
cp {package.json,package-lock.json,README.md} ${DIST}/ && \
../../node_modules/@babel/cli/bin/babel.js src --out-dir ${DIST} --source-maps both --extensions '.js,.jsx,.ts,.tsx' ${BUILD_PARAMS} && \
echo "OK package-build"
#  --minified
# npx babel src --out-dir ${DIST:-build} --source-maps --minified --comments false --copy-files  ${BUILD_PARAMS}
