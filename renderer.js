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

// TODO
// when snapshot button pressed
// function getSnapshotParams() {
//   const snapshotName = document.getElementById('snapshot-name-box').value
//   const snapshotParams = {
//     type: 'snapshot',
//     folderPath: folderPathElement.innerText,
//     savePath: snapshotPathElement.innerText,
//     snapshotName: snapshotName,    
//   }
//   return snapshotParams
// }


snapshotBtn.addEventListener('click', async () => {
  // get paths and filenames
  const snapshotName = document.getElementById('snapshot-name-box').value
  const snapshotParams = {
    type: 'snapshot',
    folderPath: folderPathElement.innerText,
    savePath: snapshotPathElement.innerText,
    snapshotName: snapshotName,    
  }
  console.log(snapshotParams)
  // window.postMessage(snapshotParams)
  const status = window.myAPI.saveSnapshot(snapshotParams)
  // if(status === true) {
  //   snapshotMessageElement.innerText = `${snapshotName} Saved`
  // } else
  // if(status === false) {
  //   snapshotMessageElement.innerText = `Error Saving Snapshot`
  // }
  
  // const snapshotName = await window.myAPI.saveSnapshot()
  // snapshotMessageElement.innerText = `${snapshotName} Saved`
})
//  wait for notice from main, that save has happened
//  then display message that snapshot has been saved by changing snapshotMessageElement.innertext



// Backup Start Button and Snapshot button would be render > main > render

// * ============================== Profile Section ==============================
// TODO
// Maybe just open the full dialogue to save a file for profiles and then load the same file with the full window dialogue