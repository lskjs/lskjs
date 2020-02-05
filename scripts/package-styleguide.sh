#!/usr/bin/env bash
env NODE_OPTIONS=--max_old_space_size=4096 \
  ../../node_modules/.bin/styleguidist server