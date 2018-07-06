import * as path from 'path'
import * as url from 'url'
import {app, BrowserWindow} from 'electron'

const isDevelopment: boolean = process.env.NODE_ENV !== 'production'

// Keeping a global reference to main window to prevent garbage collection
let mainWindow: BrowserWindow | null

async function createMainWindow () {
  try {
    // logger.log('Creating main window', 'main')
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
      // logger.log('Main window ready to show', 'main')
      mainWindow!.show()
    })

    // Dereference window when closed
    mainWindow.on('closed', () => {
      // logger.log('Window closed, dereferencing window', 'main')
      mainWindow = null
    })
  } catch (err) {
    // logger.error(`Error while creating main window: ${err}`, 'main')
  }
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
  if (mainWindow === null) {
    createMainWindow()
  }
})
