#!/usr/bin/env bash
cd packages/app && \
npm run build && \
echo "OK - npm run build" && \
rm -rf cra/build && \
rm -rf cra/src && \
pwd && \
ls -la && \
cd cra && \
pwd && \
ls -la && \
ln -s ../build src && \
ls -la src && \
CI=false SKIP_PREFLIGHT_CHECK=true npm run build && \
echo "OK - cra build" && \
# npm run server
cd .. && \
rm -rf public && \
cp -R cra/build public && \
# cp -R locales public/locales && \
# node -e "const str = require('fs').readFileSync('./public/index.html').toString(); console.log(str);"
node -e "const str = require('fs').readFileSync('./public/index.html').toString(); const code = str.split('script>')[3]; console.log(code.substr(0, code.length - 2));" > public/chunks.js && \
node -e "const str = require('fs').readFileSync('./public/index.html').toString(); const code = str.split('<div id=\"root\"></div>')[1]; console.log(code.substr(0, code.length - '</body></html>'.length));" > public/footer.html && \
cd .. && \
#npm run dev:cra"
echo "DONE"


