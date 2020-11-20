#!/usr/bin/env bash

# ./scripts/linkwatch.sh $HOME/projects/lskjs/packages/bots/build `pwd`/packages/app/node_modules/@lskjs/bots

# https://github.com/watchexec/watchexec
# `brew install watchexec`

echo "linking $1 => $2"
watchexec -r \
  -w $1 \
  --signal SIGTERM \
  -- \
    rsync -avEp --progress \
      --exclude node_modules \
      $1/ \
      $2
