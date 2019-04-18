#!/usr/bin/env bash
../../node_modules/npm-check-updates/bin/ncu '/^@lskjs/.*$/' -u && \
npm install
