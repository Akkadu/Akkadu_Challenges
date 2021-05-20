#!/bin/bash

# Webpack is not renamed the unbundled, so we do manually
for f in $(find ./release -name '*.ts'); do
  mv -- "$f" "${f%.ts}.js"
done
 
# We change the folder name from src to dist
rm -rf release/dist
mv release/src release/dist
rm release/app*

# Need to uglify one by one the files
for f in $(find ./release/dist -name '*.js'); do
    terser --compress --mangle --comments "swagger" -o "$f" --  "$f"
done

# Zip
zip -r release.zip release/*
rm -rf  release
