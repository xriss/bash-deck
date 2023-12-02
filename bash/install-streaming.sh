#!/bin/bash
cd `dirname $0`



cat ./github-pull.sh | bash -i

cat ./install-node.sh | bash -i


cat ../install/gamepass-streaming.sh | bash -i
cat ../install/geforce-streaming.sh | bash -i
cat ../install/luna-streaming.sh | bash -i


echo ; echo " finished all " ; echo ;
