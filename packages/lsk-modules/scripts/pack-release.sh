rm -rf release && \
DIST=release "`pwd`scripts/build.sh" && \
npm publish --access=public release