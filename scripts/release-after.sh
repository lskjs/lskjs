#!/usr/bin/env bash
if [[ -f ./scripts/release-after-hook.sh ]]
then
  ./scripts/release-after-hook.sh
fi