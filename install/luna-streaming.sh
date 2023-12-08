#!/bin/bash -i
cd `dirname $0`

# use edge browser
flatpak install -y com.google.Chrome
flatpak --user override --filesystem=/run/udev:ro com.google.Chrome

# install node if not installed yet
[ ! -d "../js/node_modules" ] && ../bash/install-node.sh

# create shortcut
../js/steamshortcut.js add \
--app-name="Luna Streaming" \
--exe="/usr/bin/flatpak" \
--launch-options="run com.google.Chrome --window-size=1024,640 --force-device-scale-factor=1.25 --device-scale-factor=1.25 --start-fullscreen --user-agent=\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0\" https://luna.amazon.com/"


echo ; echo " finished " ; echo ;
