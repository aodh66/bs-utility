# bs-utility
A.K.A the Backup & Save Utility

This is a simple utility to save and snapshot a folder. The original intent was to make something to back up Dark Souls or other Fromsoftware game saves, before realising that it had the potential to do more, and technically back up any folder, not just game saves.

This was also a project to help me get some experience with Electron. Despite the tongue in cheek name of bs-utility, I am not a fan of bs, and I want to keep this project simple and streamlined, for the best user experience.

![alt text](https://github.com/aodh66/bs-utility/blob/main/images/bs-utility.png?raw=true)

## Intended Features

- Allow the user to backup their save folder to a folder of their choosing.
- Choose how many backups they want to keep, and how often they want to back up.
- Choose when to start and stop the backup.
- Allow the user to snapshot their save folder to a folder of their choosing.
  - This is a manual backup, intended for use before you fight a boss for the first time. This lets the user can go back and experience the bossfight more easily than doing an entire new or NG+ playthrough. It also lets them attempt the fight again with their original character, rather than a more optimised character on a new playthrough based on their knowledge of the first one.
- Choose a hotkey to save a snapshot from ingame, without tabbing out to the utility.
- Name the snapshot to keep track of the gamestate at the time.
- Save the current configuration to a profile, that can be loaded later, to manage multiple games or use cases.

## Potential future features
- Light theme
- Cross platform compatibility/mac and linux versions

## Installation
For normal people, you can just download the packaged and ready to go files [from here](https://www.mediafire.com/file/2mvd1n7zok0ss24/Backup_%2526_Save_Utility.7z/file) (give me a shout if the link has died and I can replace it). Unzip the folder with 7zip, place it wherever you want, and launch bs-utility.exe.

If you want to compile it yourself you can clone this repo, open in your code editor of choice if you want to look at anything, `npm i` in your terminal as usual to get the packages, and then use `npm run make` to build to the \out folder. If you want a version with all of my testing notes removed, that exists in the 'staging' branch. NOTE: If you do this and compile yourself, you will need to make a folder called 'profiles' in the same directory as bs-utility.exe so it has somewhere to save your profiles to, an well as transferring over the icons folder.

## Usage Instructions
There are multiple functions that the utility can perform. Rolling Backups, Snapshots (A single instance of a backup) and Profile saving.

### Rolling Backups
To initiate a rolling backup, choose a folder to backup and a location to save backups. The location you save the backups to should have a memorable name, as the backups themselves will be named 'Backup #'.

NOTE: If you put backups of different games into one folder, they WILL overwrite eachother.

Input your desired backup frequency in minutes, and the number of backups you want to keep. The app will then back up that many instances and cycle through the number you have chosen. The 'Backup Status' light will show green and the button will read 'Stop Backup' when backups are in progress. The light will show red and the button will read 'Start Backup' when backups are not in progress. If you stop a backup between instances, that cycle will exit the next time it tries to backup.

### Snapshots
To initiate a snapshot, choose a folder to backup IN THE BACKUP SECTION and a location to save snapshots IN THE SNAPSHOT SECTION. The snapshot will be named whatever you have entered under Snapshot name. When the snapshot has been saved, '<snapshot name> Snapshot Saved' will be displayed.

NOTE: If you call snapshots the same thing and save them in the same folder, they WILL overwrite eachother.

NOTE: If you are using this to backup games, do not make a snapshot while the game is autosaving, if it is a streamed autosave, the snapshot could end up being corrupted, as the app has no way to know if the game is done saving or not. It will simply snapshot the game save's state when it is asked.

### Snapshot Hotkeys
To designate a hotkey type the key into the hotkey box and press the 'Register Hotkey' button. Hotkeys and modifiers need to be entered into the box in the format shown by default with no spaces, capitals at the start of words, and separated by a + sign. If you wanted to hit Control, Shift, U to snapshot, you would enter either of the following into the box: Ctrl+Shift+U or Control+Shift+U. For a full list of snapshot hotkey options, refer to the available modifiers and keycodes [listed here](https://www.electronjs.org/docs/latest/api/accelerator). When the hotkey is registered, <snapshot name> Hotkey Registered' will be displayed. When the snapshot has been saved, '<snapshot name> Snapshot Saved' will still be displayed like when the snapshot button is clicked.

NOTE: When you click 'Register Hotkey', it will unregister any hotkeys you already have saved.

### Profiles
Once you have configured all of the parameters to your liking, at any point you can enter a name and save a profile. This will save the data of every input field in the app, including the windows dialogues that pop up so you can choose a folder path. You can then load that profile by typing its name into the 'Profile name' field, and clicking 'Load Profile'. When a profile is saved or loaded, '<profile name> Profile Saved/Loaded' will be displayed.

NOTE: The app will save the last loaded profile whenever a profile is saved or loaded, so when you next open the app, it will pick up where you left off, unless you did not want to save your setup.

*Icon courtesy of Stockio.com*
