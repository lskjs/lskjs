#!/usr/bin/env bash
cd packages/app

../../node_modules/concurrently/bin/concurrently.js -rki  \
    "npm run watch" \
    " \
       sleep 10 && \
       rm -rf cra/build && \
       rm -rf cra/src && \
       cd cra && \
       ln -s ../build src && \
       REACT_APP___DEV__=1 REACT_APP_TEST=1 SKIP_PREFLIGHT_CHECK=true npm start
    " \
    " \
       sleep 20 && \
       npm run server:dev \
    "
cd ../..