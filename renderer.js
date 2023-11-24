// ! Placholder
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

// * ============================== Backup Section ==============================
// Backup Folder Elements
const folderBtn = document.getElementById('backup-folder-path-btn')
const folderPathElement = document.getElementById('folderPath')


// Choose folder to backup Event Handling
folderBtn.addEventListener('click', async () => {
  const folderPath = await window.myAPI.selectFolder()
  folderPathElement.innerText = folderPath
})

// Save Location Elements
const saveBtn = document.getElementById('backup-folder-save-path-btn')
const savePathElement = document.getElementById('folderSavePath')

// Choose save location Event Handling
saveBtn.addEventListener('click', async () => {
  const savePath = await window.myAPI.selectFolder()
  savePathElement.innerText = savePath
})

// TODO
// Backup Param and Button Elements
const backupTime = document.getElementById('backup-time')
const backupNumber = document.getElementById('backup-number')
const backupBtn = document.getElementById('backup-btn')



// * ============================== Snapshot Section ==============================
// Snapshot Elements
const snapshotPathBtn = document.getElementById('snapshot-save-path-btn')
const snapshotPathElement = document.getElementById('snapshotSavePath')
const snapshotMessageElement = document.getElementById('snapshotMessage')
const snapshotHotkeyElement = document.getElementById('snapshotHotkey')
const snapshotBtn = document.getElementById('snapshotBtn')

// Snapshot save location Event Handling
snapshotPathBtn.addEventListener('click', async () => {
  const snapshotPath = await window.myAPI.selectFolder()
  snapshotPathElement.innerText = snapshotPath
})

// TODO define hotkey for snapshot
const hotkey = 'test'


// when snapshot button pressed
snapshotBtn.addEventListener('click', async () => {
  // get paths and filenames
  const snapshotName = document.getElementById('snapshot-name-box').value
  const snapshotParams = {
    type: 'snapshot',
    folderPath: folderPathElement.innerText,
    savePath: snapshotPathElement.innerText,
    snapshotName: snapshotName,    
  }
  // ! Debug
  // console.log(snapshotParams)

  //! Simple response method
  // call snapshot function in main and await a positive response
  const status = await window.myAPI.saveSnapshot(snapshotParams)
  // console.log(`return ${status}`)

  // on positive response, display message to the user on save status
  if(status === true) {
      // ! Debug
    // console.log('less consistent true')
    snapshotMessageElement.innerText = `${snapshotName} Saved`
  } else {
      // ! Debug
    // console.log('less consistent false')
    snapshotMessageElement.innerText = `Error Saving Snapshot`
  }

  // ! Main to Renderer message method
  // Collect response from main on whether the snapshot has been saved
  // Display that status to the user
// window.myAPI.mainResponse((_event, value) => {
//   // ! Debug
//     // console.log(`windowapimessageresponse ${value}`)
//     if(value === true) {
//       snapshotMessageElement.innerText = `${snapshotName} Saved`
//     } else {
//       snapshotMessageElement.innerText = `Error Saving Snapshot`
//     }
//   })
})

// * ============================== Profile Section ==============================
// TODO
// Maybe just open the full dialogue to save a file for profiles and then load the same file with the full window dialogue