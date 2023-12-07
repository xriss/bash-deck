#!/bin/bash -i
cd `dirname $0`

bash/install-node.sh

install/gamepass-streaming.sh
install/geforce-streaming.sh
install/luna-streaming.sh

install/decky-loader.sh

echo ; echo " finished install all " ; echo ;
