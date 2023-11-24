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
  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'),
 saveSnapshot: (snapshotParams) => ipcRenderer.invoke('saveSnapshot', snapshotParams), // TODO this needs to return the name of the snapshot, maybe also the status of if the save was successful
})

// process.once('loaded', () => {
//   window.addEventListener('message', evt => {
//     if (evt.data.type === 'snapshot') {
//       ipcRenderer.send(evt.data)
//     }
//   })
// })