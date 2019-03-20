# git branch -D build
# git branch build
#
git checkout build
git merge master -m "silent merge"

build=`cat ./build/i.txt`
build=$(($build+1))
rm -rf ./build
npm run build
echo $build > ./build/i.txt

git add -A ./build -f
git commit -m "build_$build"
git tag -a "build_$build" -m "build_$build"
        
git push origin build:build -f
git push origin --follow-tags
#git push origin2 --tags

git checkout master
