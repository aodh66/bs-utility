// * Imports
const { app, BrowserWindow, dialog, ipcMain, globalShortcut } = require('electron')
const path = require('node:path')
const fs = require('node:fs')

// * Create Main Program Window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 1000,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        enableRemoteModule: true
      }
  })

  // * Main app functionality
  // Function to open the win explorer windows to select folders.
    // Returns the selected filepath in an array
  ipcMain.handle('dialog:openDirectory', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    })
    if (canceled) {
      return
    } else {

      // ! Debug
      // console.log(filePaths[0])

      return filePaths[0]
    }
  })

  // Function to save a snapshot (manual backup instance) of a folder with a custom name
    // Returns a boolean, true if it executed and saved
  ipcMain.handle('saveSnapshot', async (event, snapshotParams) => {

    // ! Debug
    // console.log(event)
    // console.log(snapshotParams)
    // ! Maybe unneeded
    // const params = snapshotParams

    // Save backup filepath and modify receptacle with chosen snapshot name
    const backupPath = snapshotParams.folderPath
    const savePath = snapshotParams.savePath + '\\' +snapshotParams.snapshotName

        // ! Debug
    // console.log(savePath)

    // Filesystem method and function to copy files from backupPath to savePath recursively
      // Returns nothing directly, can call the Main to Renderer message function mainResponse
      // to return a value, or can just return true to more simply do the same thing
fs.cp(backupPath, savePath, { recursive: true }, (err) => {
      if (err) {
        throw err
      } else{

            // ! Debug
        // console.log(`Copied ${backupPath} to ${savePath}`)

        // ! Message way to return true
        // win.webContents.send('mainResponse', true)
      }
  })
  // ! Simple way to return true
    return true
  })

  // TODO let the user set a shortcut, then slap the entire above function in here as well, or let them call it through the preload or something
  globalShortcut.register('Alt+CommandOrControl+I', () => {
        // ! Debug
    console.log('Electron loves global shortcuts!')
  })


  // TODO
  // function that starts and stops backup, and does something every given minutes
    // function that backs up a file based on the return variables of stuff passed through by the above function?

  // function that snapshots the folder to the backup location
    // maybe better if it uses cli stuff to copy the folders over, as that should work on any platform
    // function to capture the name designated for the snapshot folder
    // ipcMain.handle()



  win.loadFile('index.html')
}

// * MAC
// * Create new main window when clicked on Mac
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// * Universal
// * Close app when exited, sleep on Mac
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})