NODE_ENV=production yarn run build &&
cd ./build &&
NODE_ENV=production yarn &&
cd .. &&
rsync -avz ./build/* root@s3.mgbeta.ru:/projects/lsk/app &&
ssh root@s3.mgbeta.ru 'cd /projects/lsk && docker-compose stop && docker-compose up' &&
echo 'ok'
