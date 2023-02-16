#!/usr/bin/env bash
VAR=$(git status --porcelain 2>/dev/null | wc -l)
echo $VAR
if [ $VAR -gt 0 ]; then
    echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" && \
    echo "Working tree has uncommitted changes ($VAR), please commit or remove changes before continuing." && \
    echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" && \
    exit 1
fi
