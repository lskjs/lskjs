#!/usr/bin/env bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
node $DIR/package-build.js --color always && \
if [[ -d ./cra ]]
then
  sh ../../scripts/package-cra-build.sh
fi
# DIST=${DIST:-build}
# echo "DIST=$DIST"
# BUILD_PARAMS=${BUILD_PARAMS:---copy-files}
# echo "BUILD_PARAMS=$BUILD_PARAMS"

# mkdir -p ${DIST} && \
# cp {package.json,package-lock.json,README.md} ${DIST}/ && \
# she
# ../../node_modules/typescript/bin/tsc --declaration --declarationMap --emitDeclarationOnly --outDir ${DIST} src/**.ts && \
# ../../node_modules/@babel/cli/bin/babel.js src --out-dir ${DIST} --source-maps both --extensions '.js,.jsx,.ts,.tsx' ${BUILD_PARAMS} && \
# echo "OK package-build"
# #  --minified
# # npx babel src --out-dir ${DIST:-build} --source-maps --minified --comments false --copy-files  ${BUILD_PARAMS}
