

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
const backupStatusLight = document.getElementById("backup-status-light");
const backupMessage = document.getElementById("backupMessage");

backupTime.value = 10;
backupNumber.value = 2;
// TODO backupTime.value = ConfigValue
// TODO backupNumber.value = ConfigValue

// Initialise backup status
let backupState = false;
function giveBackupState() {
  givenState = backupStatusLight.innerText
  return givenState
}

// display it to the user
function showBackupState() {
  backupStatusLight.innerText = `${backupState}`;
}
showBackupState()

// * Function to pull current backup params from index.html values
// TODO will need a default one that would pull from the config file
function giveBackupParams() {
  return {
    type: "backup",
    folderPath: folderPathElement.innerText,
    savePath: savePathElement.innerText,
    frequency: backupTime.value,
    number: backupNumber.value,
    state: backupState,
  };
}

// ! TEST STATE AND ROLLING FUNCTION CALL
// // Function to toggle backupState and show it in the ui onclick of backup button
// backupBtn.addEventListener("click", () => {
//   if(backupState === false) {
//     backupState = true
//     showBackupState()
//   } else
//   if(backupState === true) {
//     backupState = false
//     showBackupState()
//   }
// })
// // Function to send backupstate 
// backupBtn.addEventListener("click", () => {
//   // get current paths and filenames in param object
//   console.log(`renderer start status ${backupState}`)
//   if(backupState === false) {
//     backupState = true
//     showBackupState()
//   } else
//   if(backupState === true) {
//     backupState = false
//     showBackupState()
//   }
//   console.log(`renderer call status ${backupState}`)
//   const backupParams = giveBackupParams();

//  window.myAPI.backup(backupParams);
// });

// window.myAPI.backupParams((event, value) => {
//   if(value === 'give') {
//     let backupParams = giveBackupParams();
//    event.sender.send('backupParams', backupParams)
//   }
// })

    // ! Test Area =========================================================================

    // ! Ideas
    // ! - Cron
    // ! - send a call to main asking if it should go
        // ! - what if each run it checks to see if the cronjob is already created
    // ! - creates a non constant cronJob. If it exists, stop it, overwrite and start it
        // ! - if doesn't exist, write it and start it
    // ! - 

// ! Rolling function
  //   function testrollBackup(){
  //     console.log('rolling')
  //     let choice = giveBackupState()
  //     while(!choice) {
  //       console.log('stopping')
  //       return
  //       // clearTimeout(testrollBackup)
  //     }
  //     setTimeout(testrollBackup, 1000);
  // }
  // testrollBackup();

  // ! Cronjob
  // const cronJob = new CronJob(
  //     '* * * * * *', // cronTime
  //     function () {
  //       console.log(`Every second ${lmao}`);
  //     }, // onTick
  //     null, // onComplete
  //   );

  // let rollBackup = () => {
  //   let choice = giveBackupState()
  //   if(choice){
  //     console.log('GOING')
  //     setTimeout(rollBackup, 1000);
  //   } else
  //   if(!choice) {
  //     return
  //     // setTimeout(() => {
  //     //   console.log('Break')
  //     // }, 1000);
  //   }
    
    // do whatever you like here
    // console.log(backupState)
    // if(!backupState) {
    //   return
    // }
  // }

    // ! Onclick toggle event
    // backupBtn.addEventListener("click", () => {
    //   // get current paths and filenames in param object
    //   console.log(`renderer start status ${backupState}`)
    //   if(backupState === false) {
    //     backupState = true
    //     showBackupState()
    //     // rollBackup = () => {
    //     //   let choice = giveBackupState()
    //     //   if(choice){
    //     //     console.log('GOING')
    //     //     setTimeout(rollBackup, 1000);
    //     //   } else
    //     //   if(!choice) {
    //     //     setTimeout(() => {
    //     //       console.log('Break')
    //     //     }, 1000);
    //     //   }
          
    //     //   // do whatever you like here
    //     //   // console.log(backupState)
    //     //   // if(!backupState) {
    //     //   //   return
    //     //   // }
    //     // }
    //     rollBackup()
    //   } else
    //   if(backupState === true) {
    //     backupState = false
    //     showBackupState()
    //     // rollBackup = () => {
    //     //   console.log('BREAK')
    //     // };
    //     // rollBackup()
    //   }

    //   //! while(giveBackupState() === `backupStatus = true`){} 


    //   // function rollBackup () {
    //   //   let choice = giveBackupState()
    //   //   console.log(choice)
    //   //   if(choice === `backupStatus = true`){
    //   //     console.log('GOING')
    //   //   } else
    //   //   if(choice === `backupStatus = true`) {
    //   //     console.log('STOPPING')
    //   //     return
    //   //   }
    //   // }
    //   //   setTimeout(rollBackup, 3000);
    //   //   rollBackup()
    //   // console.log(`renderer call status ${backupState}`)
    //   // const backupParams = giveBackupParams();
    // });

    // !WORKING INFINITE FUNCTIONS, overwrite it to stop it
    // ! ==========================
    // function infinite () {
      //     console.log('Infinite Function')
      //     setTimeout(infinite, 1000);
      //   }
      //   infinite();

      // let state = true
      let state = false
      let currentNumb = 1
      let paramState = getParamState()

      function getParamState() {
        return {
          type: "backup",
          folderPath: folderPathElement.innerText,
          savePath: savePathElement.innerText,
          frequency: backupTime.value,
          currentNumb: currentNumb,
          state: state,
        };
      }

      function stateTrue() {
        state = true
      }
      
      function stateFalse() {
        state = false
      }

      function showState() {
        backupStatusLight.innerText = `${state}`;
      }
      showState()

      
      function resetBackNum() {
        if(currentNumb !== 1) {
          currentNumb = 1
        }
      }
      function changeBackNum() {
        let total = backupNumber.value
        if(currentNumb < total) {
          currentNumb = currentNumb + 1
        } else
        if(currentNumb = total) {
          currentNumb = 1
        }
      }
      // ! Test for currentNumb function
      // backupNumber.value = 3
      // console.log(currentNumb)
      // changeBackNum()
      // console.log(currentNumb)
      // changeBackNum()
      // console.log(currentNumb)
      // changeBackNum()
      // console.log(currentNumb)

      // TODO put in check to make sure that the variables when it was first called have not changed
        // TODO so if the async status response is different to params, then return
        // currentNumb, make function that checks the number of backups field, then changes a state
          // var by increasing it by one as long as it is less than the numbackups field 
          async function testFunc(inputState) {
        if(!state) {
          return
        }
        // console.log('Test is running')
        // let tempParams = giveBackupParams()

          paramState = {
          type: "backup",
          folderPath: folderPathElement.innerText,
          savePath: savePathElement.innerText,
          frequency: backupTime.value,
          currentNumb: currentNumb,
          // state: state,
        };

        console.log(paramState)
        
        // ! Backup call to Main
        const status = await window.myAPI.backupSave(paramState);
        // TODO on positive response, display message to the user on save status
        if (status) {
          console.log(status)
          backupMessage.innerText = `Backup ${status.currentNumb} Saved`;
        }
        if(!state) {
          console.log('negatory')
          return
        }

        // might not need to do this check if state is the same
        let currentParams = inputState

        if(status.folderPath != inputState.folderPath || 
          status.savePath != inputState.savePath || 
          status.frequency != inputState.frequency) {
          console.log('negatory')
          return
        }
        changeBackNum()
        setTimeout(()=>{testFunc(currentParams)}, 3000);
      }

      // !Test With Profile Buttons 
      // document.getElementById("saveProfileBtn").addEventListener("click", () => {
      //   stateTrue()
      //   testFunc()
      // })
      
      // document.getElementById("loadProfileBtn").addEventListener("click", () => {
      //   stateFalse()
      // })

    // ! Onclick toggle event
    backupBtn.addEventListener("click", () => {
      console.log('toggle state')
      if(state === false) {
        stateTrue()
        console.log(state)
        showState()
        let passedState = getParamState()
        testFunc(passedState)
      } else
      if(state === true) {
        stateFalse()
        console.log(state)
        showState()
      }
    });

    // ! Older Tests ======================================
      // let testFunc = () => {
      //   console.log('Test is running')
      //   // hello = giveHello()
      //   if(!hello) {
      //     return
      //   }
      //   setTimeout(testFunc, 1000);
      // }
      // testFunc();

      // document.getElementById("saveProfileBtn").addEventListener("click", () => {
      //   // let testFunc = () => {
      //   //   console.log('Test is running')
      //   //   setTimeout(testFunc, 1000);
      //   // }
      //   // testFunc();
      // })
      
      // document.getElementById("loadProfileBtn").addEventListener("click", () => {
      //   // testFunc = () => {
      //   //   console.log('Test is stopping')
      //   // }
      // })
      // ! ==========================
    // ! Test Area =========================================================================

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
