cross-env NODE_ENV=production \
  eslint \
    --cache \
    --cache-location=.cache/eslint \
    --ext .js,.jsx,.json \
    --report-unused-disable-directives \
    src