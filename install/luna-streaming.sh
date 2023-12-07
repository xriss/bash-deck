#!/bin/bash -i
cd `dirname $0`

# use edge browser
flatpak install -y com.microsoft.Edge
flatpak --user override --filesystem=/run/udev:ro com.microsoft.Edge

# install node if not installed yet
[ ! -d "../js/node_modules" ] && ../bash/install-node.sh

# create shortcut
../js/steamshortcut.js add \
--app-name="Luna Streaming" \
--exe="/usr/bin/flatpak" \
--launch-options="run com.microsoft.Edge --window-size=1024,640 --force-device-scale-factor=1.25 --device-scale-factor=1.25 --start-fullscreen --user-agent=\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54\" https://luna.amazon.com/"


echo ; echo " finished " ; echo ;
