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

  ipcMain.handle('dialog:openDirectory', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    })
    if (canceled) {
      return
    } else {
      // console.log(filePaths[0])
      return filePaths[0]
    }
  })

  //TODO this function needs to be given the filepaths from the different html element innertexts
  // button pressed
  // capture innertext of snapshot name
  // capture innertext of file path
  // modify file path by adding snapshot name to end 
  // actually copy the files
  // alert user that snapshot has been saved
  ipcMain.handle('saveSnapshot', async (event, snapshotParams) => {
    // ! Debug
    // console.log(event)
    // console.log(snapshotParams)
    // ! Maybe unneeded
    // const params = snapshotParams
    const backupPath = snapshotParams.folderPath
    const savePath = snapshotParams.savePath + '\\' +snapshotParams.snapshotName
        // ! Debug
    // console.log(savePath)

fs.cp(backupPath, savePath, { recursive: true }, (err) => {
      if (err) {
        throw err
      } else{
            // ! Debug
        // console.log(`Copied ${backupPath} to ${savePath}`)
        win.webContents.send('mainResponse', true)
      }
  })
  // ! Simple way to return true
    return true
  })
  // ipcMain.on('snapshot', async (event, arg) => {
  //   const result = await arg
  //   console.log('directories selected', event)
  //   console.log('directories selected', result)
  // })

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