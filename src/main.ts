const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keeping a global reference of the windows
let win

function createWindow () {
  win = new BrowserWindow()

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Dereference window when closed
  win.on('closed', () => {
    win = null
  })
}

// Wait for Electron to be ready before loading main window
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // Don't quit on close if on MacOS
  if (process.platform === 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
