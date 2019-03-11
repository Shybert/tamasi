import * as path from 'path'
import * as url from 'url'
import {app, BrowserWindow, ipcMain, globalShortcut, BrowserWindowConstructorOptions} from 'electron'

const isDevelopment: boolean = process.env.NODE_ENV !== 'production'

// Set correct userData path
isDevelopment ? app.setPath('userData', path.join(app.getPath('appData'), 'dsdt-dev')) : app.setPath('userData', path.join(app.getPath('appData'), 'dsdt'))
console.log(`userData path: ${app.getPath('userData')}`)

// Keeping a global reference to windows to prevent garbage collection
let mainWindow: BrowserWindow | null
let overlayWindow: BrowserWindow | null

function createMainWindow () {
  mainWindow = new BrowserWindow({show: false, frame: false})

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
  const windowOptions: BrowserWindowConstructorOptions = isDevelopment ? {show: false} : {show: false, alwaysOnTop: true, frame: false}

  overlayWindow = new BrowserWindow(windowOptions)

  if (isDevelopment) overlayWindow.webContents.openDevTools()

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

  overlayWindow.on('close', () => {
    globalShortcut.unregisterAll()
  })

  // Dereference window when closed
  overlayWindow.on('closed', () => {
    overlayWindow = null
  })
})

ipcMain.on('hideShowOverlay', () => {
  if (!overlayWindow) return
  if (overlayWindow.isMinimized()) overlayWindow.restore()
  else overlayWindow.minimize()
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
