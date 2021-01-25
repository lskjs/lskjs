#!/usr/bin/env bash
DIRTO='.'
DIR=`pwd`

# rm -rf scripts/* && \
rsync -avEp --progress \
  --exclude-from='scripts/update-starter-kit.exclude.txt' \
  ../lib-starter-kit/  $DIRTO && \
rsync -avEp --progress --ignore-existing ../lib-starter-kit/.lskjs.js $DIRTO && \
rsync -avEp --progress --ignore-existing ../lib-starter-kit/README.md $DIRTO && \
rsync -avEp --progress --ignore-existing ../lib-starter-kit/CHANGELOG.md $DIRTO && \
rsync -avEp --progress --ignore-existing ../lib-starter-kit/.all-contributorsrc $DIRTO && \
rsync -avEp --progress ../lib-starter-kit/scripts/assets/ $DIRTO/scripts/assets && \
echo "===========================================" && \
echo "        All OK, now you need todo:" && \
echo "npm install && npm run bootstrap && npm run update" && \
echo "===========================================" 
