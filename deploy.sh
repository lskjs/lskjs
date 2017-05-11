NODE_ENV=production yarn run build &&
NODE_ENV=production yarn run build-storybook &&
cd ./build &&
NODE_ENV=production yarn &&
cd .. &&
rsync -avz ./build/* s3:/projects/lsk/app &&
ssh s3 'cd /projects/lsk && docker-compose stop && docker-compose up' &&
echo 'ok'
