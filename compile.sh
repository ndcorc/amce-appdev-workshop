dir=${1%/}
rm -rf $dir.zip
zip -r $dir.zip ./$dir/*