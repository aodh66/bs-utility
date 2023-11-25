//  * Imports
const { contextBridge, ipcRenderer } = require("electron");

// ! Placeholder
contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
});

// TODO could pull ipcRenderer.on blocks into a single input and listen for different values for each use
// * Choose Directory Dialogues (File Explorer Windows)
contextBridge.exposeInMainWorld("myAPI", {
  // Opens a windows explorer folder select window, then sends the results object from Renderer to Main. Main sends them back to Renderer.
  selectFolder: () => ipcRenderer.invoke("dialog:openDirectory"),
  // Takes the snapshot file path, receptacle filepath, desired folder name, and sends them from Renderer to Main. Main sends back a boolean on whether it copied the directory.
  saveSnapshot: (snapshotParams) =>
    ipcRenderer.invoke("saveSnapshot", snapshotParams),
  // Sends a value from Main to Renderer through the sendSnapshot channel to ask for snapshot param data
  sendSnapshotParams: (mainTrue) => ipcRenderer.on("sendSnapshot", mainTrue),
  // Takes the data from snapshotparams, sets the hotkey, and returns a boolean
  saveSnapshotHotkey: (snapshotParams) =>
    ipcRenderer.invoke("saveSnapshotHotkey", snapshotParams),
  // Sends a value from Main to Renderer through the mainResponse channel (intended instead of the boolean, but can be used for other things)
  mainResponse: (mainResponse) => ipcRenderer.on("mainResponse", mainResponse),
});
