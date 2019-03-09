rm -rf release && \
DIST=release "scripts/build.sh" && \
npm publish release
# npm publish --access=public release