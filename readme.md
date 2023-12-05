
I find typing on the steam deck rather annoying and setting up a 
keyboard etc even more annoying. Combine this with any tweak I might 
make to my steam deck needing to be repeated on my partners steam deck 
and you can see that I must resort to programming rather than suffer 
these indignities.

This git repo contains a number of bash scripts to perform useful steam 
deck installs whilst avoiding as much typing as possible.

Currently it will install decky-loader and gamepass-steaming both are 
working well for me.

I recommend cloning this repo to you steam desktop and you can then 
click it on your desktop to open the folder to choose and run the 
desktop/bash files within.

# Install

You can download this repo as a zip from github, extract it and then 
double click on install-bash-deck.desktop to install everything.

https://github.com/xriss/bash-deck/archive/refs/heads/main.zip


# How to clone to your steam deck with minimal typing ...

Log into (create an account first if needed) github and fork this repo 
on github. This is so you have your own copy that can then sync 
directly to your steam deck. This makes it easier to clone and is also 
a good security step forcing you to choose when to update from the 
original repo and also lets you tweak your configuration files on 
github before installing them.

Install "Github desktop" from flatpak onto your steam deck and use it 
to clone *your* repo into the Desktop folder of *your* steam deck.

The two are now linked and you can make changes on the github website 
that easily copy to your steam deck. So any typing can be done there.

The above will require you to login and type git into search bars to 
find the right app and deck to find the right repo.

The advantage of this way is you can tweak the scipts on your fork and 
easily send the changes to your steamdeck without having to type on it.

The github-pull script in bash can be used to pull changes onto the 
steamdeck from github.


# Run

Once you have this repo on your steamdeck then...

Double click the install-bash-deck.desktop to perform all of the 
installs in the install directory.

Alternatively you can go into the folders and choose exactly what to 
run.

# Folders

1. bash

	Internal scripts to help with other scripts.

3. install

	Contains .sh bash scripts to install programs and .desktop files to 
	make running the .sh files easier. Just double click the .desktop 
	file to run the .sh file and perform the install.
	


