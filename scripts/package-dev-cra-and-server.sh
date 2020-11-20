#!/usr/bin/env bash
../../node_modules/concurrently/bin/concurrently.js -rki  \
  " \
    npm run dev:cra \
  " \
  " \
    npm run dev:server \
  "
cd ../..