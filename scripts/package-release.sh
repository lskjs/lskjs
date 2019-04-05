rm -rf release && \
DEBUG=0 DIST=release `dirname "$0"`/package-build.sh && \
npm publish release