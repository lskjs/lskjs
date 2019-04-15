HOME='.'
rsync -avE --progress  ../lib-starter-kit/ $HOME --exclude='*/' --exclude='lerna.json' --exclude='.huskyrc.json' --exclude='README.md'
rsync -avE --progress  ../lib-starter-kit/.storybook $HOME
rsync -avE --progress  ../lib-starter-kit/scripts/* $HOME/scripts
