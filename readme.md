# Under construction...

I find typing on the steam deck rather annoying and setting up a 
keyboard etc even more annoying. Combine this with any tweak I might 
make to my steam deck needing to be repeated on my partners steam deck 
and you can see that I must resort to programming rather than suffer 
these indignities.

This git repo contains a number of bash scripts to perform various 
useful steam deck installs and tweaks whilst avoiding as much typing as 
possible.

I recommend cloning this repo to you steam desktop and you can then 
click it on your desktip to open the folder and choose and run the bash 
scripts within. My plan is that the bash scripts will simply accept 
cursor keys ( use the dpad ) and enter key ( use button a ) to fully 
control them so no need to type just select from menus.


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


# Folders

1. install

	Contains bash scripts to install programs, run with no arguments 
	( just click on them ) to install the program.
	
	Other possible command line arguments are `remove` , `version` and 
	the default of `install`
 
2. github

	Contains bash scripts to `pull` changes from github etc.

3. bash

	Internal scripts to help with other scripts.

