#!/bin/bash
cd `dirname $0`

echo "deck ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/deck
