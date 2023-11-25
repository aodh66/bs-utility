# bs-utility
A.K.A the Backup & Save Utility

This is a simple utility to save and snapshot a folder. The original intent was to make something to back up Dark Souls or other Fromsoftware game saves, before realising that it had the potential to do more, and technically back up any folder, not just game saves.

The intent of this project is to be lightweight and simple. Despite the tongue in cheek name of bs-utility, I am not a fan of bs, and I want to keep this project simple and streamlined, for the best user experience.

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

## Usage Instructions

### Snapshot Hotkeys
To designate a hotkey type the key into the hotkey box and press the save button. Note that hotkeys and modifiers need to be entered into the box in the format shown by default with no spaces, capitals at the start of words, and separated by a + sign. If you wanted to hit Control, Shift, U to snapshot, you would enter either of the following into the box: Ctrl+Shift+U or Control+Shift+U
For a full list of snapshot hotkey options, refer to the available modifiers and keycodes [listed here](https://www.electronjs.org/docs/latest/api/accelerator).