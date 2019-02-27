#!/bin/sh
NODE_ENV=development npm install && \
NODE_ENV=production npm run build
