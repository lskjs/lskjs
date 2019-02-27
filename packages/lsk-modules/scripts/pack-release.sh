rm -rf release && \
DIST=release scripts/build.sh && \
npm publish --access=public release