#!/usr/bin/env bash
cd build && \
NPMDIR=`npm root -g` && \
PACKAGE=`node -e "console.log(require('./package.json').name)"` && \
NPMSRC="$NPMDIR/$PACKAGE" && \
SRC=`pwd` && \
# echo "ln -s $SRC $NPMSRC"  && \
rm -rf $NPMSRC && \
ln -s $SRC $NPMSRC && \
echo "$NPMSRC => $SRC" && \
cd ../