#!/usr/bin/env bash
# cross-env 
NODE_ENV=production \
  ../../node_modules/eslint/bin/eslint.js \
    --cache \
    --cache-location=.cache/eslint \
    --ext .js,.jsx,.json,.ts,.tsx \
    --report-unused-disable-directives \
    src