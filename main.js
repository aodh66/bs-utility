const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('node:path')
// const {dialog, ipcMain} from 'electron'

// async function handleDirectoryOpen () {
//   const { canceled, filePaths } = await dialog.showOpenDialog()
//   if (!canceled) {
//     console.log(filePaths)
//     return filePaths[0]
//   }
// }

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


  
  // function that starts and stops backup, and does something every given minutes
    // function that backs up a file based on the return variables of stuff passed through by the above function?

  // function that snapshots the folder to the backup location
    // maybe better if it uses cli stuff to copy the folders over, as that should work on any platform
    // function to capture the name designated for the snapshot folder
    // ipcMain.handle()

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})