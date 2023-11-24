// * Imports
const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('node:path')

// ! Placeholder
// async function handleDirectoryOpen () {
//   const { canceled, filePaths } = await dialog.showOpenDialog()
//   if (!canceled) {
//     console.log(filePaths)
//     return filePaths[0]
//   }
// }

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


  // TODO
  // function that starts and stops backup, and does something every given minutes
    // function that backs up a file based on the return variables of stuff passed through by the above function?

  // function that snapshots the folder to the backup location
    // maybe better if it uses cli stuff to copy the folders over, as that should work on any platform
    // function to capture the name designated for the snapshot folder
    // ipcMain.handle()


    // button pressed
    // capture snapshot name
    // capture file path
    // modify file path
    // actually copy the files
    // alert user that snapshot has been saved

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