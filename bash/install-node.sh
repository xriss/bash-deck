#!/bin/bash
cd `dirname $0`

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash -i

echo " nvm install node " | bash -i

echo " cd js ; npm install " | bash -i

echo ; echo " finished " ; echo ;
