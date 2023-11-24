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
  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'), // Opens a windows explorer folder select window, then sends the results object from Renderer to Main. Main sends them back to Renderer.
  saveSnapshot: (snapshotParams) => ipcRenderer.invoke('saveSnapshot', snapshotParams), // Takes the snapshot file path, receptacle filepath, desired folder name, and sends them from Renderer to Main. Main sends back a boolean on whether it copied the directory.
  mainResponse: (mainResponse) => ipcRenderer.on('mainResponse', mainResponse) // ! Sends a value from Main to Renderer through the saveResponse channel (intended instead of the boolean, but can be used for other things)
})

// process.once('loaded', () => {
//   window.addEventListener('message', evt => {
//     if (evt.data.type === 'snapshot') {
//       ipcRenderer.send(evt.data)
//     }
//   })
// })