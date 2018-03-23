import * as path from 'path'
import * as url from 'url'
import * as fs from 'fs-extra'
import {app, BrowserWindow, ipcMain} from 'electron'

// Keeping a global reference of the windows
let winMain: any

// Copy storage if it doesn't exist yet
copyStorage()

function createMainWindow () {
  winMain = new BrowserWindow()

  winMain.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Dereference window when closed
  winMain.on('closed', () => {
    winMain = null
  })
}

// Wait for Electron to be ready before loading main window
app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
  // Don't quit on close if on MacOS
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (winMain === null) {
    createMainWindow()
  }
})

// IPC
ipcMain.on('openSaveWindow', async (event: Event, id: string): Promise<void> => {
  try {
    console.log(`Loading save window with game ID '${id}'`)
    loadWindow('saves')

    // Sending the game ID
    console.log('Setting global game ID variable')
    global.sharedObject = {
      id
    }
  } catch (err) {
    console.log(`Error while processing openSaveWindow IPC req: ${err}`)
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

// Load a new window
async function loadWindow (name: string): Promise<void> {
  try {
    console.log(`Loading new window ${name}.html`)
    winMain.loadURL(url.format({
      pathname: path.join(__dirname, `${name}.html`),
      protocol: 'file:',
      slashes: true
    }))
  } catch (err) {
    console.log(`Error while trying to load a new window: ${err}`)
  }
}
