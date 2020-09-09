#!/bin/bash 
# This is a very simple example
# 若提示权限问题,请执行 chmod +x  *.sh

echo Enter Component Name
read NAME


# 创建文件夹
rm -rf ./.tmp && mkdir .tmp
cp -r "./com-template" .tmp/$NAME
cd .tmp/$NAME
# 修改文件内容
# mac 不允许sed -i直接修改文件内容,会强制备份,所以多加了一个空字符, linux下不需要

for filename in `ls -B`
do  
    sed -i '' "s/com/$NAME/g" $filename
done

# 修改文件名
mv com.scss $NAME.scss
mv com.jsx $NAME.jsx


echo "the com is --> $NAME -- $PWD"

exit 0