#!/bin/bash


for file in `ls columnnames` ; do
  # mv $file $file.txt
  echo $file >> temp.txt
  egrep -o '<dd title="(.*?)">' columnnames/$file >> temp.txt
done


# sed -E -e 's/<dd title="//' -e 's/">//' <temp.txt >temp
#
#