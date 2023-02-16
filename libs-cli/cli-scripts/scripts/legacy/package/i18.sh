#!/usr/bin/env bash

I18_URL=`node -e "console.log(require('./.lskjs.js').i18.url || '')"`
I18_LOCALES=`node -e "console.log(require('./.lskjs.js').i18.locales || 'en,ru')"`
I18_DIST=`node -e "console.log(require('./.lskjs.js').i18.dist || './i18')"`

echo "Creating i18 JSON for locales: ${I18_LOCALES}"
echo "${I18_URL} => ${I18_DIST}"

rm -rf $I18_DIST && \
mkdir -p $I18_DIST && \
node ../../node_modules/@lskjs/build-locales/bin/build-locales \
  --locales ${I18_LOCALES} \
  --link ${I18_URL} \
  --dist ${I18_DIST} && \
echo "done"
