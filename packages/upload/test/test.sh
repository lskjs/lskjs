#!/usr/bin/env bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
echo $DIR

curl -F "file=@$DIR/avatar.jpg" http://localhost:8081/api/upload/file