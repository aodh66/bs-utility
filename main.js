// * =================================
// * Imports
// * =================================
const {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  globalShortcut,
} = require("electron");
const path = require("node:path");
const fs = require("node:fs");

// * =================================
// * Create Main Program Window
// * =================================
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      enableRemoteModule: true,
    },
  });

  // * =================================
  // * Main app functionality
  // * =================================
  // Function to open the win explorer windows to select folders.
  // Returns the selected filepath in an array
  ipcMain.handle("dialog:openDirectory", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"],
    });
    if (canceled) {
      return;
    } else {
      return filePaths[0];
    }
  });

  // * Function to back up a donator folder to a given folder subfolder with a given name
  // * Runs on rolling backup
  // * Returns the parameters given to it
  ipcMain.handle("backupSave", async (event, backupParams) => {
    // todo needs a check to make sure there are filepaths
    // ! Debug
    // ? DELETE
    console.log("Backing up");
    // console.log(backupParams)
    // console.log(backupParams.folderPath)
    // Save backup filepath and modify receptacle with chosen snapshot name
    const folderPath = backupParams.folderPath;
    const saveDir = `Backup ${backupParams.currentNumb}`;
    const savePath = backupParams.savePath + "\\" + saveDir;

    // ! Tester with no save call
    // ! ======================================================================================
    // ! CURRENTLY DISABLED
    // ! ======================================================================================
    return backupParams;
    // Filesystem method and function to copy files from folderPath to savePath recursively
    // Returns nothing directly, can call the Main to Renderer message function mainResponse
    // to return a value, or can just return its params to more simply do the same thing
    fs.cp(folderPath, savePath, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
      // ! Message way to return true
      // win.webContents.send('mainResponse', true)
    });
    // ! Simple way to return true
    return backupParams;
    // ! ======================================================================================
  });

  // * Function to save a snapshot (manual backup instance) of a folder with a custom name
  // * Runs when snapshot save button is clicked
  // * Returns a boolean, true if it executed and saved
  ipcMain.handle("saveSnapshot", async (event, snapshotParams) => {
    // Save backup filepath and modify receptacle with chosen snapshot name
    const backupPath = snapshotParams.folderPath;
    const savePath =
      snapshotParams.savePath + "\\" + snapshotParams.snapshotName;

    // ! Tester with no save call
    // ! ======================================================================================
    // ! CURRENTLY DISABLED
    // ! ======================================================================================
    return true;
    // Filesystem method and function to copy files from backupPath to savePath recursively
    // Returns nothing directly, can call the Main to Renderer message function mainResponse
    // to return a value, or can just return true to more simply do the same thing
    fs.cp(backupPath, savePath, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
      // ! Message way to return true
      // win.webContents.send('mainResponse', true)
    });
    // ! Simple way to return true
    return true;
    // ! ======================================================================================
  });

  // * Function to set a hotkey that calls for snapshot Param data from renderer
  // * Runs when hotkey save button is clicked
  // * Returns a boolean, true if it executed and saved
  ipcMain.handle("saveSnapshotHotkey", async (event, snapshotHotkey) => {
    // check if hotkey is already registered
    if (globalShortcut.isRegistered(snapshotHotkey) === true) {
      return true;
    } else if (globalShortcut.isRegistered(snapshotHotkey) === false) {
      // if not registered, delete all current hotkeys, and register new one
      globalShortcut.unregisterAll();
      globalShortcut.register(snapshotHotkey, async () => {
        // get current snapshot params
        win.webContents.send("sendSnapshot", true);
        return true;
      });
    }
    // ! Simple way to return true
    return true;
  });

  // * Function to save a snapshot when it receives sent snapshot param data from renderer
  // * Runs when it receives param data
  // * Returns a boolean, true if it executed and saved
  ipcMain.on("sentParams", (_event, value) => {
    // ! Debug
    // ? DELETE
    // console.log(value);
    const backupPath = value.folderPath;
    const savePath = value.savePath + "\\" + value.snapshotName;

    // ! Tester with no save call
    // ! ======================================================================================
    // ! CURRENTLY DISABLED
    // ! ======================================================================================
    return value;
    // Filesystem method and function to copy files from backupPath to savePath recursively
    // Returns nothing directly, calls the Main to Renderer message function mainResponse
    // to return true
    fs.cp(backupPath, savePath, { recursive: true }, (err) => {
      if (err) {
        throw err;
      } else {
        // ! Message way to return true
        win.webContents.send("mainResponse", true);
      }
      try {
      } catch (err) {
        console.log(err);
      }
    });
    // ! ======================================================================================
  });

  // * =================================
  // * Loads the index.html
  // * =================================
  win.loadFile("index.html");
};

// * MAC
// * Create new main window when clicked on Mac
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// * Universal
// * Close app when exited, sleep on Mac
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});