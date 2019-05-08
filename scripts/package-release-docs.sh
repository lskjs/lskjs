env NODE_OPTIONS=--max_old_space_size=4096 \
  node ../../node_modules/@storybook/react/bin/build.js \
    .storybook -o release-storybook && \

env NODE_OPTIONS=--max_old_space_size=4096 \
  ../../node_modules/.bin/styleguidist build && \

rsync -avzO --no-perms release-storybook/* ${DEPLOY_PATH:-./release-docs} && \
rsync -avzO --no-perms release-styleguide/* "${DEPLOY_PATH:-./release-docs}/docs" && \

echo "OK"
