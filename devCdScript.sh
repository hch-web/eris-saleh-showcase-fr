#!/bin/bash

cd /home/ubuntu/Eris-saleh/Frontend/eris-saleh

git pull;

if [ $? -eq 0 ]; then
  echo 'git pull success.'
else
  echo 'git pull failure.'
  exit 1;
fi

npm run build;
sudo service nginx restart
