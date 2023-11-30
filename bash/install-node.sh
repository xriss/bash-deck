#!/bin/bash
cd `dirname $0`

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

echo "nvm install node" | bash


