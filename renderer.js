// * ==============================
// * HTML Elements
// * ==============================
// *Exit Button
const exitBtn = document.getElementById("exit-btn");
// *Backup
const backupSection = document.getElementById("backupSection");
// Backup Folder Elements
const folderBtn = document.getElementById("backup-folder-path-btn");
const folderPathElement = document.getElementById("folderPath");
// Save Location Elements
const saveBtn = document.getElementById("backup-folder-save-path-btn");
const savePathElement = document.getElementById("folderSavePath");
// Backup Param and Button Elements
const backupTime = document.getElementById("backup-time");
const backupNumber = document.getElementById("backup-number");
const backupBtn = document.getElementById("backup-btn");
// Status and Message Elements
const backupLight = document.getElementById("backupLight");
// ? DELETE
// const backupStatusLight = document.getElementById("backup-status-light");
const backupMessage = document.getElementById("backupMessage");
// * Snapshot
const snapshotSection = document.getElementById("snapshotSection");
// Snapshot Location Elements
const snapshotPathBtn = document.getElementById("snapshot-save-path-btn");
const snapshotPathElement = document.getElementById("snapshotSavePath");
// Hotkey Elements
const snapshotHotkeyElement = document.getElementById("snapshot-hotkey-box");
const snapshotHotkeyBtn = document.getElementById("snapshotHotkeyBtn");
// Snapshot Button and Param Elements
const snapshotBtn = document.getElementById("snapshotBtn");
const snapshotName = document.getElementById("snapshot-name-box");
// Message Elements
const snapshotMessageElement = document.getElementById("snapshotMessage");
// * Profile
const profileSection = document.getElementById("profileSection");
// Profile Param Element
const profileNameElement = document.getElementById("profile-name-box");
// Profile Button Elements
const profileSaveBtn = document.getElementById("saveProfileBtn");
const profileLoadBtn = document.getElementById("loadProfileBtn");
// Message Elements
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
// * Exit Button Functionality
// * ==============================
// * Function to exit the app onclick
// * Called when exit button is pressed
exitBtn.addEventListener("click", () => {
  window.myAPI.exitCall();
});

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

// Function to increment backupInstance
function backupInstancePlus() {
  backupInstance = backupInstance + 1;
}

// Function to toggle backup UI to on state (Green light, stop backup text)
function backupUIOn() {
  let state = backupState;
  if (state) {
    backupLight.classList.toggle("green-light");
    backupBtn.innerText = "Stop Backup";
  }
}

// Function to toggle backup UI to off state (Green light, stop backup text)
function backupUIOff() {
  let state = backupState;
  if (!state) {
    backupBtn.innerText = "Start Backup";
    backupLight.classList.toggle("green-light");
  }
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

  // * Backup call to Main
  const status = await window.myAPI.backupSave(paramState);
  // On positive response, display message to the user on save status
  if (status) {
    backupMessage.innerText = `Backup ${status.currentNumb} Saved`;
  }
  // Exit and don't call again if state is incorrect
  if (!backupState) {
    return;
  }

  // Check to exit function on next call, if it's not the same instance as when first called
  // Stops it running forever in background if backup is disabled, params are changed
  // and backup is restarted in between calls
  if (inputState.instance != paramState.instance) {
    return;
  }

  // Updates the backup file number between calls
  changeBackNum();

  // ! Debug - Calls every second
  // ? DELETE
  // setTimeout(() => {
  //   testFunc(inputState);
  // }, 1000);
  // Runs the function again after user chosen delay
  setTimeout(() => {
    testFunc(inputState);
  }, inputState.frequency * 60000);
}

// * Rolling Backup Onclick toggle
// Changes state + shows user, and starts backup when state is correct
backupBtn.addEventListener("click", () => {
  // If state is false, make it true, change UI, get data, try to start backup
  if (backupState === false) {
    backupStateTrue();
    backupInstancePlus();
    let passedState = getBackupParams();

    // If no filepaths are provided, ask for them, change UI color, display error
    if (!passedState.folderPath || !passedState.savePath) {
      if (
        backupSection.classList[backupSection.classList.length - 1] !=
        "errorsection"
      ) {
        backupSection.classList.toggle("errorsection");
      }
      backupMessage.innerText = `Provide folders to backup`;
      backupStateFalse();
      return;
    }
    // Prevent trying to backup to the same filepath, change UI color, display error
    if (passedState.folderPath == passedState.savePath) {
      if (
        backupSection.classList[backupSection.classList.length - 1] !=
        "errorsection"
      ) {
        backupSection.classList.toggle("errorsection");
      }
      backupMessage.innerText = `You cannot back a folder up into itself`;
      backupStateFalse();
      return;
    }
    // Prevent negative backup frequency or number of backups, change UI color, display error
    if (passedState.frequency < 0.01 || backupNumber.value < 1) {
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
    backupUIOn();
  } else if (backupState === true) {
    backupStateFalse();
    backupUIOff();
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

  // call snapshot function in main and await a positive response
  const status = await window.myAPI.saveSnapshot(snapshotParams);

  // on positive response, display message to the user on save status
  if (status === true) {
    snapshotMessageElement.innerText = `${snapshotParams.snapshotName} Snapshot Saved`;
  } else {
    snapshotMessageElement.innerText = `Error Taking Snapshot`;
  }
});

// * ------------------------------
// * Snapshot Hotkey
// * ------------------------------
// * Response from hotkey saying that save is successful
//  Main to Renderer message method
// Collect response from main on whether the snapshot has been saved
// Display that status to the user
window.myAPI.mainResponse((_event, value) => {
  if (value === true) {
    snapshotMessageElement.innerText = `${snapshotName.value} Snapshot Saved`;
  } else {
    snapshotMessageElement.innerText = `Error Taking Snapshot`;
  }
});

// * Function that saves a hotkey onclick
// add event listeners
snapshotHotkeyBtn.addEventListener("load", handler);
snapshotHotkeyBtn.addEventListener("click", handler);
// add handler function
async function handler(event) {
  // get current paths and filenames in param object
  const status = await window.myAPI.saveSnapshotHotkey(
    snapshotHotkeyElement.value
  );
  if (status === true) {
    snapshotMessageElement.innerText = `${snapshotHotkeyElement.value} Hotkey Registered`;
  } else {
    snapshotMessageElement.innerText = `Error Registering Hotkey`;
  }
}
// Call the hotkey save function on window load, so hotkey is active immediately
handler();

// * Giving the main.js hotkey function call the current snapshot params
window.myAPI.sendSnapshotParams((event, value) => {
  const snapshotParams = giveSnapshotParams();

  // If no filepaths are provided, ask for them, change UI color, display error
  if (!snapshotParams.folderPath || !snapshotParams.savePath) {
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
  // Prevent having no profile name, change UI color, display error
  if (!profileData.profileName) {
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
  const profileRequest = getProfileData().profileName;

  // Prevent having no profile name, change UI color, display error
  if (!profileRequest) {
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
