#!/bin/bash -i
cd `dirname $0`


../bash/github-pull.sh


../bash/install-streaming.sh


../install/decky-loader.sh


echo ; echo " finished install " ; echo ;
