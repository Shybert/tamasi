import * as path from 'path'
import * as url from 'url'
import * as fs from 'fs-extra'
import {app, BrowserWindow, ipcMain} from 'electron'

const isDevelopment: boolean = process.env.NODE_ENV !== 'production'

// Set correct userData path
app.setPath('userData', path.join(app.getPath('appData'), 'dsdt'))

// Keeping a global reference to windows to prevent garbage collection
let mainWindow: BrowserWindow | null
let overlayWindow: BrowserWindow | null

// Copy storage if it doesn't exist yet
declare const __static: string
copyStorage()

async function createMainWindow () {
  mainWindow = new BrowserWindow({show: false})

  if (isDevelopment) {
    mainWindow.webContents.openDevTools()
  }

  if (isDevelopment) {
    mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow!.show()
  })

  // Dereference window when closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.on('loadOverlayWindow', async (event: Event, gameId: string, saveId: string) => {
  overlayWindow = new BrowserWindow({show: false})

  if (isDevelopment) {
    overlayWindow.webContents.openDevTools()
  }

  if (isDevelopment) {
    overlayWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}/#/overlay/${gameId}/${saveId}`)
  } else {
    overlayWindow.loadURL(url.format({
      pathname: path.join(__dirname, `index.html/#/overlay/${gameId}/${saveId}`),
      protocol: 'file:',
      slashes: true
    }))
  }

  overlayWindow.once('ready-to-show', () => {
    overlayWindow!.show()
  })

  // Dereference window when closed
  overlayWindow.on('closed', () => {
    overlayWindow = null
  })
})

// Wait for Electron to be ready before loading main window
app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
  // Don't quit on close if on MacOS
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})

// Copy the storage files to userdata
async function copyStorage (): Promise<void> {
  try {
    await fs.copy(path.join(__static, 'storage'), path.join(app.getPath('userData'), 'storage'), {overwrite: false})
    console.log(`userData: ${app.getPath('userData')}`)
  } catch (err) {
    console.error(`Error while copying storage: ${err}`)
  }
}
