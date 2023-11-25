// ! Placeholder
const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

// * ==============================
// * Backup Section
// * ==============================
// Backup Folder Elements
const folderBtn = document.getElementById("backup-folder-path-btn");
const folderPathElement = document.getElementById("folderPath");

// * Choose folder to backup Event Handling
folderBtn.addEventListener("click", async () => {
  const folderPath = await window.myAPI.selectFolder();
  folderPathElement.innerText = folderPath;
});

// Save Location Elements
const saveBtn = document.getElementById("backup-folder-save-path-btn");
const savePathElement = document.getElementById("folderSavePath");

// * Choose save location Event Handling
saveBtn.addEventListener("click", async () => {
  const savePath = await window.myAPI.selectFolder();
  savePathElement.innerText = savePath;
});

// TODO ==============================
// TODO Rolling Backup
// TODO ==============================
// Backup Param and Button Elements
const backupTime = document.getElementById("backup-time");
const backupNumber = document.getElementById("backup-number");
const backupBtn = document.getElementById("backup-btn");

// * ==============================
// * Snapshot Section
// * ==============================
// Snapshot Elements
const snapshotPathBtn = document.getElementById("snapshot-save-path-btn");
const snapshotPathElement = document.getElementById("snapshotSavePath");
const snapshotMessageElement = document.getElementById("snapshotMessage");
const snapshotHotkeyElement = document.getElementById("snapshot-hotkey-box");
const snapshotHotkeyBtn = document.getElementById("snapshotHotkeyBtn");
const snapshotHotkeyMessageElement = document.getElementById(
  "snapshotHotkeyMessage"
);
const snapshotBtn = document.getElementById("snapshotBtn");
const snapshotName = document.getElementById("snapshot-name-box");
snapshotHotkeyElement.value = `Ctrl+0`;
// TODO snapshotHotkeyBtn.value = ConfigValue
// // TODO snapshotHotkeyBtn[0].placeholder = ConfigValue

// * Function to pull current snapshot params from index.html values
// TODO will need a default one that would pull from the config file
function giveSnapshotParams() {
  return {
    type: "snapshot",
    folderPath: folderPathElement.innerText,
    savePath: snapshotPathElement.innerText,
    snapshotName: snapshotName.value,
  };
}

// * Snapshot save location Event Handling
snapshotPathBtn.addEventListener("click", async () => {
  const snapshotPath = await window.myAPI.selectFolder();
  snapshotPathElement.innerText = snapshotPath;
});

// * Snapshot save onclick
snapshotBtn.addEventListener("click", async () => {
  // get current paths and filenames in param object
  const snapshotParams = giveSnapshotParams();

  //! Simple response method
  // call snapshot function in main and await a positive response
  const status = await window.myAPI.saveSnapshot(snapshotParams);

  // on positive response, display message to the user on save status
  if (status === true) {
    snapshotMessageElement.innerText = `${snapshotParams.snapshotName} Snapshot Taken`;
  } else {
    snapshotMessageElement.innerText = `Error Taking Snapshot`;
  }
});

// * Response from hotkey saying that save is successful
// ! Main to Renderer message method
// Collect response from main on whether the snapshot has been saved
// Display that status to the user
window.myAPI.mainResponse((_event, value) => {
  // ! Debug
  // console.log(`windowapimessageresponse ${value}`)
  if (value === true) {
    snapshotMessageElement.innerText = `${snapshotName.value} Snapshot Taken`;
  } else {
    snapshotMessageElement.innerText = `Error Taking Snapshot`;
  }
});


// TODO immediately call the function to set the hotkey (will be used for config load later)
  // * create an onclick to call it again if you press the save hotkey button
  // add event listeners
snapshotHotkeyBtn.addEventListener("load", handler);
snapshotHotkeyBtn.addEventListener("click", handler);
// add handler function
async function handler(event) {
    // get current paths and filenames in param object
  const snapshotParams = giveSnapshotParams();
  const status = await window.myAPI.saveSnapshotHotkey(
    snapshotHotkeyElement.value
  );
  if (status === true) {
    snapshotHotkeyMessageElement.innerText = `${snapshotHotkeyElement.value} Hotkey and ${snapshotParams.snapshotName} Name Registered`;
  } else {
    snapshotHotkeyMessageElement.innerText = `Error Registering Parameters`;
  }
}

// Giving the main.js hotkey function call the current snapshot params
window.myAPI.sendSnapshotParams((event, value) => {
  const snapshotParams = giveSnapshotParams();
  event.sender.send("sentParams", snapshotParams);
});

// * ==============================
// * Profile Section
// * ==============================
// TODO
// Maybe just open the full dialogue to save a file for profiles and then load the same file with the full window dialogue
