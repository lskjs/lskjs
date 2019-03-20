# lerna publish --conventional-commits --yes --skip-npm
lerna publish --skip-npm # && \
# lerna exec -- \\$LERNA_ROOT_PATH/scripts/pack-release.sh
# npm version patch && \
# lerna exec -- \\$LERNA_ROOT_PATH/scripts/pack-release.sh && \
# git push origin --tags