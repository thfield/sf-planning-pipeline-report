#!/bin/bash


for file in `ls raw` ; do
  # mv $file $file.txt
  echo $file >> temp.html
  cat raw/$file >> temp.html
  # egrep -o '<dd title="(.*?)">' columnnames/$file >> temp.txt
done


# sed -E -e 's/<dd title="//' -e 's/">//' <temp.txt >temp
#
#