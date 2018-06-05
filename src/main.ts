import * as path from 'path'
import * as url from 'url'
import * as fs from 'fs-extra'
import {app, BrowserWindow, ipcMain, globalShortcut} from 'electron'
import Logger from './helpers/logger/loggerMain'

const logger = new Logger()

// Keeping a global reference of the windows
let winMain: any
let winOverlay: any

// Copy storage if it doesn't exist yet
copyStorage()

async function createWindow () {
  try {
    winMain = new BrowserWindow()

    winMain.loadURL(url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    }))

    // Dereference window when closed
    winMain.on('closed', () => {
      winMain = null
    })
  } catch (err) {
    console.error(`Error while creating main window: ${err}`)
  }
}

// Wait for Electron to be ready before loading main window
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // Don't quit on close if on MacOS
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (winMain === null) {
    createWindow()
  }
})

// Listen for opening overlay
ipcMain.on('loadOverlay', async (): Promise<void> => {
  try {
    winOverlay = new BrowserWindow()

    winOverlay.loadURL(url.format({
      pathname: path.join(__dirname, '../overlay.html'),
      protocol: 'file:',
      slashes: true
    }))

    // Dereference window when closed
    winOverlay.on('closed', () => {
      winOverlay = null
    })

    // Detect when window is closed so keybindings can be cleared
    winOverlay.on('close', () => {
      console.log('Clearing keybindings')
      globalShortcut.unregisterAll()
    })
  } catch (err) {
    console.error('Error while loading overlay:', err)
  }
})

// Functions
// Copy the storage files to userdata
async function copyStorage (): Promise<void> {
  try {
    logger.log('Copying storage/ to userData')
    await fs.copy('app/storage', path.join(app.getPath('userData'), 'storage'), {overwrite: false})
    logger.log('Copied storage/ to userData')
  } catch (err) {
    logger.error(`Error while copying storage: ${err}`)
  }
}
