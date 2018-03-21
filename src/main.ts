// import * as path from 'path'
// import * as url from 'url'
// import {app, BrowserWindow} from 'electron'
import * as path from 'path'
import * as url from 'url'
import * as fs from 'fs-extra'
import {app, BrowserWindow} from 'electron'

// Keeping a global reference of the windows
let winIndex: any

// Copy storage if it doesn't exist yet
copyStorage()

function createMainWindow () {
  winIndex = new BrowserWindow()

  winIndex.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Dereference window when closed
  winIndex.on('closed', () => {
    winIndex = null
  })
}

// Wait for Electron to be ready before loading main window
app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
  // Don't quit on close if on MacOS
  if (process.platform === 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (winIndex === null) {
    createMainWindow()
  }
})

// Functions
// Copy the storage files to userdata
async function copyStorage (): Promise<void> {
  try {
    console.log('Copying storage/ to userData')
    await fs.copy('app/storage', path.join(app.getPath('userData'), 'storage'), {overwrite: false})
    console.log('Copied storage/ to userData')
  } catch (err) {
    console.log(`Error while copying storage: ${err}`)
  }
}
