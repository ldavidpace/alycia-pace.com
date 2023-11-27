#!/bin/bash


echo "installing Server Dependencies"

pushd server;
npm install
popd

for PROJECT in src/*;
do
    echo "install $PROJECT"
    pushd $PROJECT;
    npm install;
    popd;
done


echo "Finished installing sub Porject dependencies"