NODE_ENV=production yarn run build &&
cd ./build &&
NODE_ENV=production yarn &&
cd .. &&
rsync -avz ./build/* s3:/projects/momentum/app &&
ssh s3 'cd /projects/momentum && docker-compose stop && docker-compose up' &&
echo 'ok'
