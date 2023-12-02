#!/bin/bash -i
cd `dirname $0`

flatpak install -y com.microsoft.Edge
flatpak --user override --filesystem=/run/udev:ro com.microsoft.Edge

../js/steamshortcut.js add \
--app-name="Gamepass Streaming" \
--exe="/usr/bin/flatpak" \
--launch-options="run com.microsoft.Edge --window-size=1024,640 --force-device-scale-factor=1.25 --device-scale-factor=1.25 --start-fullscreen https://www.xbox.com/play"


echo ; echo " finished " ; echo ;
