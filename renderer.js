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
const snapshotBtn = document.getElementById('snapshot-save-path-btn')
const snapshotPathElement = document.getElementById('snapshotSavePath')
const snapshotMessageElement = document.getElementById('snapshotMessage')
const snapshotHotkeyElement = document.getElementById('snapshotHotkey')

// Snapshot save location Event Handling
snapshotBtn.addEventListener('click', async () => {
  const snapshotPath = await window.myAPI.selectFolder()
  snapshotPathElement.innerText = snapshotPath
})

// TODO




// Backup Start Button and Snapshot button would be render > main > render

// * ============================== Profile Section ==============================
// TODO