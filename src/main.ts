import * as path from 'path'
import * as url from 'url'
import {app, BrowserWindow} from 'electron'

// Keeping a global reference of the windows
let winIndex: any

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
