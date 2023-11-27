// ! Placeholder
// ? DELETE
const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

// * ==============================
// * HTML Elements
// * ==============================
// *Backup
// Backup Folder Elements
const backupSection = document.getElementById("backupSection");
const folderBtn = document.getElementById("backup-folder-path-btn");
const folderPathElement = document.getElementById("folderPath");
// Save Location Elements
const saveBtn = document.getElementById("backup-folder-save-path-btn");
const savePathElement = document.getElementById("folderSavePath");
// Backup Param and Button Elements
const backupTime = document.getElementById("backup-time");
const backupNumber = document.getElementById("backup-number");
const backupBtn = document.getElementById("backup-btn");
const backupStatusLight = document.getElementById("backup-status-light");
const backupMessage = document.getElementById("backupMessage");
// Snapshot Elements
const snapshotSection = document.getElementById("snapshotSection");
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
// Profile Elements
const profileSection = document.getElementById("profileSection");
const profileNameElement = document.getElementById("profile-name-box");
const profileSaveBtn = document.getElementById("saveProfileBtn");
const profileLoadBtn = document.getElementById("loadProfileBtn");
const profileMessageElement = document.getElementById("profileMessage");
profileNameElement.value = "defaultProfile";
let placeholderProfile = "defaultProfile";
profileMessageElement.innerText = `Profile ${placeholderProfile} Loaded`;

// * Function to get all user data
function getProfileData() {
  return {
    profileName: profileNameElement.value,
    backupFolderPath: folderPathElement.innerText,
    backupSavePath: savePathElement.innerText,
    backupFrequency: backupTime.value,
    backupNumber: backupNumber.value,
    snapshotSavePath: snapshotPathElement.innerText,
    snapshotHotkey: snapshotHotkeyElement.value,
    snapshotName: snapshotName.value,
  };
}

// * Function to set all user data
function setProfileData(loadedProfile) {
  profileNameElement.value = loadedProfile.profileName;
  folderPathElement.innerText = loadedProfile.backupFolderPath;
  savePathElement.innerText = loadedProfile.backupSavePath;
  backupTime.value = loadedProfile.backupFrequency;
  backupNumber.value = loadedProfile.backupNumber;
  snapshotPathElement.innerText = loadedProfile.snapshotSavePath;
  snapshotHotkeyElement.value = loadedProfile.snapshotHotkey;
  snapshotName.value = loadedProfile.snapshotName;
}

// * ==============================
// * Loading Last Profile
// * ==============================
// * Function to request the last used profile data on app start, load it, and populate the UI
// * Populate Default Profile UI
setProfileData({
  profileName: "defaultProfile",
  backupFolderPath: "",
  backupSavePath: "",
  backupFrequency: 10,
  backupNumber: 2,
  snapshotSavePath: "",
  snapshotHotkey: "Ctrl+0",
  snapshotName: "Snapshot",
});

// * Last Profile Load
async function loadInitialProfile() {
  // call profile load function in main and await a positive response
  const status = await window.myAPI.loadInitialProfile();

  // on positive response, display message to the user on load status
  if (status) {
    setProfileData(status);
    profileMessageElement.innerText = `${status.profileName} Profile Loaded`;
  } else {
    profileMessageElement.innerText = `Error Loading Profile`;
  }
}
loadInitialProfile();

// * ==============================
// * Backup Section
// * ==============================
// * Choose folder to backup Event Handling
folderBtn.addEventListener("click", async () => {
  const folderPath = await window.myAPI.selectFolder();
  folderPathElement.innerText = folderPath;
});

// * Choose save location Event Handling
saveBtn.addEventListener("click", async () => {
  const savePath = await window.myAPI.selectFolder();
  savePathElement.innerText = savePath;
});

// * ------------------------------
// * Rolling Backup
// * ------------------------------
// Initialise backup states
let backupState = false;
let currentNumb = 1;
let backupInstance = 1;

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

// Function to increment backupInstance
function backupInstancePlus() {
  backupInstance = backupInstance + 1;
}

// * Function to pull current Backup Params
function getBackupParams() {
  return {
    type: "backup",
    folderPath: folderPathElement.innerText,
    savePath: savePathElement.innerText,
    frequency: backupTime.value,
    currentNumb: currentNumb,
    state: backupState,
    instance: backupInstance,
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
    instance: backupInstance,
  };

  // ! Debug
  // ? DELETE
  // console.log('Backup is running')
  // console.log('paramState', paramState)
  // console.log('inputState', inputState)

  // * Backup call to Main
  const status = await window.myAPI.backupSave(paramState);
  // On positive response, display message to the user on save status
  if (status) {
    // ! Debug
    // ? DELETE
    // console.log('status', status)
    backupMessage.innerText = `Backup ${status.currentNumb} Saved`;
  }
  // Exit and don't call again if state is incorrect
  if (!backupState) {
    // ! Debug
    // ? DELETE
    // console.log('negatory')
    return;
  }

  // Check to exit function on next call, if it's not the same instance as when first called
  // Stops it running forever in background if backup is disabled, params are changed
  // and backup is restarted in between calls
  if (inputState.instance != paramState.instance) {
    // ! Debug
    // ? DELETE
    // console.log('negatory')
    return;
  }

  // Updates the backup file number between calls
  changeBackNum();

  // ! Debug - Calls every second
  // ? DELETE
  setTimeout(() => {
    testFunc(inputState);
  }, 1000);
  // Runs the function again after user chosen delay
  // setTimeout(()=>{testFunc(inputState)}, inputState.frequency*60000);
}

// * Rolling Backup Onclick toggle
// Changes state + shows user, and starts backup when state is correct
backupBtn.addEventListener("click", () => {
  // ! Debug
  // ? DELETE
  // console.log('toggle state')

  // If state is false, make it true, change UI, get data, try to start backup
  if (backupState === false) {
    backupStateTrue();
    // ! Debug
    // ? DELETE
    // console.log(state)
    showBackupState();
    backupInstancePlus();
    let passedState = getBackupParams();

    // If no filepaths are provided, ask for them, change UI color, display error
    if (!passedState.folderPath || !passedState.savePath) {
      // ! Debug
      // ? DELETE
      // console.log('Provide filepaths')
      if (
        backupSection.classList[backupSection.classList.length - 1] !=
        "errorsection"
      ) {
        backupSection.classList.toggle("errorsection");
      }
      backupMessage.innerText = `Provide folders to backup`;
      backupStateFalse();
      showBackupState();
      return;
    }
    // Prevent trying to backup to the same filepath, change UI color, display error
    if (passedState.folderPath == passedState.savePath) {
      // ! Debug
      // ? DELETE
      // console.log('You cannot back a folder up into itself')
      if (
        backupSection.classList[backupSection.classList.length - 1] !=
        "errorsection"
      ) {
        backupSection.classList.toggle("errorsection");
      }
      backupMessage.innerText = `You cannot back a folder up into itself`;
      backupStateFalse();
      showBackupState();
      return;
    }
    // Prevent negative backup frequency or number of backups, change UI color, display error
    if (passedState.frequency < 0.01 || backupNumber.value < 1) {
      // ! Debug
      // ? DELETE
      // console.log('You cannot have <=0 backup frequency, or less than 1 backup')
      if (
        backupSection.classList[backupSection.classList.length - 1] !=
        "errorsection"
      ) {
        backupSection.classList.toggle("errorsection");
      }
      backupMessage.innerText = `You cannot have <=0 backup frequency, or less than 1 backup`;
      backupTime.value = 10;
      backupNumber.value = 2;
      backupStateFalse();
      showBackupState();
      return;
    }
    // If UI color was error mode, change it back to normal
    if (
      backupSection.classList[backupSection.classList.length - 1] ==
      "errorsection"
    ) {
      backupSection.classList.toggle("errorsection");
    }

    // Start Backup
    testFunc(passedState);
  } else if (backupState === true) {
    backupStateFalse();
    // ! Debug
    // ? DELETE
    // console.log(state)
    showBackupState();
  }
});

// * ==============================
// * Snapshot Section
// * ==============================
// * Function to pull current snapshot params from index.html values
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

  // If no filepaths are provided, ask for them, change UI color, display error
  if (!snapshotParams.folderPath || !snapshotParams.savePath) {
    // ! Debug
    // ? DELETE
    // console.log('Provide filepaths')
    if (
      snapshotSection.classList[snapshotSection.classList.length - 1] !=
      "errorsection"
    ) {
      snapshotSection.classList.toggle("errorsection");
    }
    snapshotMessageElement.innerText = `Provide folders to backup`;
    return;
  }
  // Prevent trying to backup to the same filepath, change UI color, display error
  if (snapshotParams.folderPath == snapshotParams.savePath) {
    // ! Debug
    // ? DELETE
    // console.log('You cannot back a folder up into itself')
    if (
      snapshotSection.classList[snapshotSection.classList.length - 1] !=
      "errorsection"
    ) {
      snapshotSection.classList.toggle("errorsection");
    }
    snapshotMessageElement.innerText = `You cannot back a folder up into itself`;
    return;
  }
  // If UI color was error mode, change it back to normal
  if (
    snapshotSection.classList[snapshotSection.classList.length - 1] ==
    "errorsection"
  ) {
    snapshotSection.classList.toggle("errorsection");
  }

  //! Simple response method
  // call snapshot function in main and await a positive response
  const status = await window.myAPI.saveSnapshot(snapshotParams);

  // on positive response, display message to the user on save status
  if (status === true) {
    snapshotMessageElement.innerText = `${snapshotParams.snapshotName} Snapshot Saved`;
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
  // ? DELETE
  // console.log(`windowapimessageresponse ${value}`)
  if (value === true) {
    snapshotMessageElement.innerText = `${snapshotName.value} Snapshot Saved`;
  } else {
    snapshotMessageElement.innerText = `Error Taking Snapshot`;
  }
});

// TODO immediately call the function to set the hotkey (will be used for config load later)
// TODO create an onclick to call it again if you press the save hotkey button
// * Function that saves a hotkey and snapshot name onclick
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
    snapshotHotkeyMessageElement.innerText = `${snapshotHotkeyElement.value} Hotkey Registered`;
  } else {
    snapshotHotkeyMessageElement.innerText = `Error Registering Hotkey`;
  }
}

// Giving the main.js hotkey function call the current snapshot params
window.myAPI.sendSnapshotParams((event, value) => {
  const snapshotParams = giveSnapshotParams();

  // If no filepaths are provided, ask for them, change UI color, display error
  if (!snapshotParams.folderPath || !snapshotParams.savePath) {
    // ! Debug
    // ? DELETE
    // console.log('Provide filepaths')
    if (
      snapshotSection.classList[snapshotSection.classList.length - 1] !=
      "errorsection"
    ) {
      snapshotSection.classList.toggle("errorsection");
    }
    snapshotMessageElement.innerText = `Provide folders to backup`;
    return;
  }
  // Prevent trying to backup to the same filepath, change UI color, display error
  if (snapshotParams.folderPath == snapshotParams.savePath) {
    // ! Debug
    // ? DELETE
    // console.log('You cannot back a folder up into itself')
    if (
      snapshotSection.classList[snapshotSection.classList.length - 1] !=
      "errorsection"
    ) {
      snapshotSection.classList.toggle("errorsection");
    }
    snapshotMessageElement.innerText = `You cannot back a folder up into itself`;
    return;
  }
  // If UI color was error mode, change it back to normal
  if (
    snapshotSection.classList[snapshotSection.classList.length - 1] ==
    "errorsection"
  ) {
    snapshotSection.classList.toggle("errorsection");
  }

  event.sender.send("sentParams", snapshotParams);
});

// * ==============================
// * Profile Section
// * ==============================
//? Maybe just open the full dialogue to save a file for profiles and then load the same file with the full window dialogue
// * Profile Save Onclick
profileSaveBtn.addEventListener("click", async () => {
  let profileData = getProfileData();
  // ! Debug
  // ? DELETE
  // console.log(profileData)

  // Prevent having no profile name, change UI color, display error
  if (!profileData.profileName) {
    // ! Debug
    // ? DELETE
    // console.log('You must have a profile name')
    if (
      profileSection.classList[profileSection.classList.length - 1] !=
      "errorsection"
    ) {
      profileSection.classList.toggle("errorsection");
    }
    profileMessageElement.innerText = `You must have a profile name`;
    return;
  }
  // If UI color was error mode, change it back to normal
  if (
    profileSection.classList[profileSection.classList.length - 1] ==
    "errorsection"
  ) {
    profileSection.classList.toggle("errorsection");
  }

  //! Simple response method
  // call profile save function in main and await a positive response
  const status = await window.myAPI.saveProfile(profileData);

  // on positive response, display message to the user on save status
  if (status === true) {
    profileMessageElement.innerText = `${profileData.profileName} Profile Saved`;
  } else {
    profileMessageElement.innerText = `Error Saving Profile`;
  }
});

// * Profile Load Onclick
profileLoadBtn.addEventListener("click", async () => {
  // ! Debug
  // ? DELETE
  const profileRequest = getProfileData().profileName;
  // console.log(profileRequest)

  // Prevent having no profile name, change UI color, display error
  if (!profileRequest) {
    // ! Debug
    // ? DELETE
    // console.log('You must enter a profile name to load one')
    if (
      profileSection.classList[profileSection.classList.length - 1] !=
      "errorsection"
    ) {
      profileSection.classList.toggle("errorsection");
    }
    profileMessageElement.innerText = `You must enter a profile name to load one`;
    return;
  }
  // If UI color was error mode, change it back to normal
  if (
    profileSection.classList[profileSection.classList.length - 1] ==
    "errorsection"
  ) {
    profileSection.classList.toggle("errorsection");
  }

  //! Simple response method
  // call profile load function in main and await a positive response
  const status = await window.myAPI.loadProfile(profileRequest);

  // on positive response, display message to the user on load status
  if (status) {
    setProfileData(status);
    profileMessageElement.innerText = `${profileRequest} Profile Loaded`;
  } else {
    profileMessageElement.innerText = `Error Loading Profile`;
  }
});
