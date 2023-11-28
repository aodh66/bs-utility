//  * Imports
const { contextBridge, ipcRenderer } = require("electron");

// TODO could pull ipcRenderer.on blocks into a single input and listen for different values for each use
contextBridge.exposeInMainWorld("myAPI", {
  // * Choose Directory Dialogues (File Explorer Windows)
  // Opens a windows explorer folder select window, then sends the results object from Renderer to Main. Main sends them back to Renderer.
  selectFolder: () => ipcRenderer.invoke("dialog:openDirectory"),
  // Takes the snapshot file path, receptacle filepath, desired folder name, and sends them from Renderer to Main. Main sends back a boolean on whether it copied the directory.
  saveSnapshot: (snapshotParams) =>
    ipcRenderer.invoke("saveSnapshot", snapshotParams),
  // Sends a value from Main to Renderer through the sendSnapshot channel to ask for snapshot param data
  sendSnapshotParams: (mainTrue) => ipcRenderer.on("sendSnapshot", mainTrue),
  // Takes the data from backupParams, starts backing up, returns the params
  backupSave: (backupParams) => ipcRenderer.invoke("backupSave", backupParams),
  // Takes the data from snapshotparams, sets the hotkey, and returns a boolean
  saveSnapshotHotkey: (snapshotParams) =>
    ipcRenderer.invoke("saveSnapshotHotkey", snapshotParams),
  // Takes the data from profileData, saves a profile, and returns a boolean
  saveProfile: (profileData) => ipcRenderer.invoke("saveProfile", profileData),
  // Takes the data from profileRequested, reads that profile, and returns its data
  loadProfile: (profileRequested) =>
    ipcRenderer.invoke("loadProfile", profileRequested),
  // Asks for the last loaded profile's data, and returns its data
  loadInitialProfile: () => ipcRenderer.invoke("loadInitialProfile"),
  // Currently Unused Sends a value from Main to Renderer through the mainResponse channel (intended instead of the boolean, but can be used for other things)
  mainResponse: (mainResponse) => ipcRenderer.on("mainResponse", mainResponse),
  // Currently Unused Sends a value from Main to Renderer through the mainResponse channel (intended instead of the boolean, but can be used for other things)
  exitCall: () => ipcRenderer.send("exitCall"),
});
