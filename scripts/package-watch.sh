#!/usr/bin/env bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
BUILD_PARAMS="${BUILD_PARAMS:---copy-files} --watch"

DEBUG=1 DIST=${DIST} BUILD_PARAMS="$BUILD_PARAMS" "$DIR/package-build.sh"