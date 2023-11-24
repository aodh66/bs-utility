const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const folderBtn = document.getElementById('backup-folder-path-btn')
const folderPathElement = document.getElementById('folderPath')

folderBtn.addEventListener('click', async () => {
  const folderPath = await window.myAPI.selectFolder()
  folderPathElement.innerText = folderPath
})

const saveBtn = document.getElementById('backup-folder-save-path-btn')
const savePathElement = document.getElementById('folderSavePath')

saveBtn.addEventListener('click', async () => {
  const savePath = await window.myAPI.selectFolder()
  savePathElement.innerText = savePath
})

const snapshotBtn = document.getElementById('snapshot-save-path-btn')
const snapshotPathElement = document.getElementById('snapshotSavePath')

snapshotBtn.addEventListener('click', async () => {
  const snapshotPath = await window.myAPI.selectFolder()
  snapshotPathElement.innerText = snapshotPath
})

// Backup Start Button and Snapshot button would be render > main > render