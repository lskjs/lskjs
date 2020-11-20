#!/usr/bin/env bash
if [ -d ./cra ]
then
  npm run dev:cra-and-server
else
  npm run watch
fi
