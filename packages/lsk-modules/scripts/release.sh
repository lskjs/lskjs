npm version patch && \
lerna exec -- \\$LERNA_ROOT_PATH/scripts/pack-release.sh && \
git push origin --tags