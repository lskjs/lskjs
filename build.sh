NODE_ENV=production yarn run build &&
cp -R src/public/* build/public &&
cd ./build &&
NODE_ENV=production yarn &&
cd ..
