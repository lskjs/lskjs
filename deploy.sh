NODE_ENV=production yarn run build-storybook &&
rsync -avz ./build-storybook/* s3:/projects/lsk/app/public/storybook &&

NODE_ENV=production yarn run build &&
cd ./build &&
NODE_ENV=production yarn &&
cd .. &&
rsync -avz ./build/* s3:/projects/lsk/app &&
rsync -avz ./src/public/* s3:/projects/lsk/app/public &&
ssh s3 'cd /projects/lsk && docker-compose stop && docker-compose up' &&
echo 'ok'
