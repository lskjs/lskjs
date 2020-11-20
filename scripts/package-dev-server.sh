#!/usr/bin/env bash
../../node_modules/nodemon/bin/nodemon.js \
  --delay 0.5 \
  index.server.js | \
    ../../node_modules/@lskjs/log/bin/cli.js \
      -o short \
      -l trace