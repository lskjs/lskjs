DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
DEBUG=1 DIST=${DIST:-build} BUILD_PARAMS="${BUILD_PARAMS} --watch" "$DIR/package-build.sh"