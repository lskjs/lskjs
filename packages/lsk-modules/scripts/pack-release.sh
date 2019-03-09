rm -rf release && \
DEBUG=0 DIST=release `dirname "$0"`/pack-build.sh && \
npm publish release
# npm publish --access=public release