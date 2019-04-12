HOME='.'
rsync -avE --progress  ../lib-starter-kit/ $HOME --exclude='*/'
rsync -avE --progress  ../lib-starter-kit/.storybook $HOME
rsync -avE --progress  ../lib-starter-kit/scripts/* $HOME/scripts
