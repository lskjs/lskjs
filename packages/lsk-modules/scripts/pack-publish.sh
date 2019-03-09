rm -rf release && \
DEBUG=0 DIST=release $LERNA_ROOT_PATH/scripts/pack-build.sh && \
npm publish release
# npm publish --access=public release