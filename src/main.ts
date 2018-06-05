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
    logger.log('Creating main window', 'main')
    winMain = new BrowserWindow({show: false})

    winMain.loadURL(url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    }))

    winMain.once('ready-to-show', () => {
      logger.log('Main window ready to show', 'main')
      winMain.show()
    })

    // Dereference window when closed
    winMain.on('closed', () => {
      logger.log('Window closed, dereferencing window', 'main')
      winMain = null
    })
  } catch (err) {
    logger.error(`Error while creating main window: ${err}`, 'main')
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
    logger.log('Creating overlay window', 'main')
    winOverlay = new BrowserWindow({show: false})

    winOverlay.loadURL(url.format({
      pathname: path.join(__dirname, '../overlay.html'),
      protocol: 'file:',
      slashes: true
    }))

    winOverlay.once('ready-to-show', () => {
      logger.log('Overlay window ready to show', 'main')
      winOverlay.show()
    })

    // Dereference window when closed
    winOverlay.on('closed', () => {
      logger.log('Overlay window closed, dereferencing window', 'main')
      winOverlay = null
    })

    // Detect when window is closed so keybindings can be cleared
    winOverlay.on('close', () => {
      logger.log('Overlay window closed, clearing keybindings', 'main')
      globalShortcut.unregisterAll()
    })
  } catch (err) {
    logger.error(`Error while loading overlay: ${err}'`, 'main')
  }
})

ipcMain.on('LOGGER', async (event: Event, text: string, level: string, scope: string) => {
  if (level === 'log') {
    logger.log(text, scope)
  } else if (level === 'error') {
    logger.error(text, scope)
  }
})

// Functions
// Copy the storage files to userdata
async function copyStorage (): Promise<void> {
  try {
    logger.log('Copying storage/ to userData', 'main')
    await fs.copy('app/storage', path.join(app.getPath('userData'), 'storage'), {overwrite: false})
    logger.log('Copied storage/ to userData', 'main')
  } catch (err) {
    logger.error(`Error while copying storage: ${err}`, 'main')
  }
}
