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

// * ------------------------------
// * Rolling Backup
// * ------------------------------
// Backup Param and Button Elements
const backupTime = document.getElementById("backup-time");
const backupNumber = document.getElementById("backup-number");
const backupBtn = document.getElementById("backup-btn");
const backupStatusLight = document.getElementById("backup-status-light");
const backupMessage = document.getElementById("backupMessage");

// Populate UI values
backupTime.value = 10;
backupNumber.value = 2;
// TODO backupTime.value = ConfigValue
// TODO backupNumber.value = ConfigValue

// Initialise backup states
let backupState = false;
let currentNumb = 1;

// Change backup states
// Function to set backup state to true
function backupStateTrue() {
  backupState = true;
}
// Function to set backup state to false
function backupStateFalse() {
  backupState = false;
}

// Function that prints the current backup state to the UI
function showBackupState() {
  backupStatusLight.innerText = `${backupState}`;
}
showBackupState();

// * Function to pull current Backup Params
// TODO will need a default one that would pull from the config file
function getBackupParams() {
  return {
    type: "backup",
    folderPath: folderPathElement.innerText,
    savePath: savePathElement.innerText,
    frequency: backupTime.value,
    currentNumb: currentNumb,
    state: backupState,
  };
}

// ! Currently unused, resets currentNumb
// ? DELETE
// function resetBackNum() {
//   if(currentNumb !== 1) {
//     currentNumb = 1
//   }
// }

// Function that checks the number of backups field, then cycles currentNumb from 1
// up to the User value
function changeBackNum() {
  let total = backupNumber.value;
  if (currentNumb < total) {
    currentNumb = currentNumb + 1;
  } else if ((currentNumb = total)) {
    currentNumb = 1;
  }
}

// * Function that takes in input params, tells Main to save with those params, then
// * checks the params it originally got against the ones sent back by Main
// * if they are the same, it runs again and grabs an updated backup folder number
async function testFunc(inputState) {
  // Exit and don't call if state is incorrect
  if (!backupState) {
    return;
  }
  // Get Params to send to Main
  let paramState = {
    type: "backup",
    folderPath: folderPathElement.innerText,
    savePath: savePathElement.innerText,
    frequency: backupTime.value,
    currentNumb: currentNumb,
    state: backupState,
  };

  // ! Debug
  // console.log('Backup is running')
  // console.log('paramState', paramState)
  // console.log('inputState', inputState)

  // * Backup call to Main
  const status = await window.myAPI.backupSave(paramState);
  // On positive response, display message to the user on save status
  if (status) {
    // ! Debug
    // console.log('status', status)
    backupMessage.innerText = `Backup ${status.currentNumb} Saved`;
  }
  // Exit and don't call again if state is incorrect
  if (!backupState) {
    // ! Debug
    // console.log('negatory')
    return;
  }

  // Check to exit function on next call, if params have been changed in UI
  // Stops it running forever in background if backup is disabled, params are changed
  // and backup is restarted in between calls
  if (
    status.folderPath != inputState.folderPath ||
    status.savePath != inputState.savePath ||
    status.frequency != inputState.frequency
  ) {
    // ! Debug
    // console.log('negatory')
    return;
  }

  // Updates the backup file number between calls
  changeBackNum();

  // ! Debug - Calls every second
  setTimeout(() => {
    testFunc(inputState);
  }, 1000);
  // Runs the function again after user chosen delay
  // setTimeout(()=>{testFunc(inputState)}, inputState.frequency*60000);
}

// ! Rolling Backup Onclick toggle
// Changes state + shows user, and starts backup when state is correct
backupBtn.addEventListener("click", () => {
  // ! Debug
  // console.log('toggle state')
  if (backupState === false) {
    backupStateTrue();
    // ! Debug
    // console.log(state)
    showBackupState();
    let passedState = getBackupParams();
    testFunc(passedState);
  } else if (backupState === true) {
    backupStateFalse();
    // ! Debug
    // console.log(state)
    showBackupState();
  }
});

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
// Set default values
snapshotHotkeyElement.value = `Ctrl+0`;
// TODO snapshotHotkeyBtn.value = ConfigValue

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
