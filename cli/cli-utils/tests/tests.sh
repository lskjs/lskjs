#!/usr/bin/env bash

# node global.js && \
cd projects/project1/packages/package0 && \
node test.js && \
cd ../../../..  && \
cd projects/project1/packages/package1 && \
node test.js && \
cd ../../../..  && \
echo "ALL TESTS DONE"