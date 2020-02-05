#!/usr/bin/env bash
HOME='.'
DIR=`pwd`

# cd ../lib-starter-kit && git pull && cd $DIR && \
rsync -avEp --progress  ../lib-starter-kit/ $HOME \
  --exclude='*/' \
  --exclude='.git' \
  --exclude='coverage' \
  --exclude='lerna.json' \
  --exclude='.huskyrc.json' \
  --exclude='README.md' \
  --exclude='CHANGELOG.md'\
  --exclude='.env.js' && \
rsync -avEp --progress  ../lib-starter-kit/.storybook $HOME && \
rsync -avEp --progress  ../lib-starter-kit/scripts/* $HOME/scripts && \
echo "\n\n\nYou need:\nnpm install && npm run bootstrap && npm run update"
