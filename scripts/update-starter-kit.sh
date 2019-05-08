VAR=$(git status --porcelain 2>/dev/null | wc -l)
echo $VAR
if [ $VAR -gt 0 ]; then
    echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" && \
    echo "Working tree has uncommitted changes ($VAR), please commit or remove changes before continuing." && \
    echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" && \
    exit 1
fi

HOME='.'
git pull ../lib-starter-kit
rsync -avE --progress  ../lib-starter-kit/ $HOME --exclude='*/' --exclude='lerna.json' --exclude='.huskyrc.json' --exclude='README.md'
rsync -avE --progress  ../lib-starter-kit/.storybook $HOME
rsync -avE --progress  ../lib-starter-kit/scripts/* $HOME/scripts

echo "\n\n\nYou need:\nnpm install && npm run bootstrap && npm run update"
