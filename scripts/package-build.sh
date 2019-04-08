#!/bin/sh
mkdir -p ${DIST:-build} && \
cp package.json ${DIST:-build}/ && \
cp package-lock.json ${DIST:-build}/ && \
cp README.md ${DIST:-build}/ && \
# cp {package.json,package-lock.json,README.md} ${DIST:-build}/ && \
# npx babel src --out-dir ${DIST:-build} --source-maps inline --copy-files ${BUILD_PARAMS}
npx babel src --out-dir ${DIST:-build} --source-maps both --ignore .test.jsx? ${BUILD_PARAMS}
#  --minified
# npx babel src --out-dir ${DIST:-build} --source-maps --minified --comments false --copy-files  ${BUILD_PARAMS}
