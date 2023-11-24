//  * Imports
const { contextBridge, ipcRenderer } = require('electron')

// ! Placeholder
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
  // we can also expose variables, not just functions
})

// * Choose Directory Dialogues (File Explorer Windows)
contextBridge.exposeInMainWorld('myAPI', {
  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory')
})