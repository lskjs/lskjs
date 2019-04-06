DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# rm -rf build && \
DEBUG=1 DIST=build BUILD_PARAMS=--watch "$DIR/package-build.sh"