'use strict'

import * as path from 'path'
import { app, protocol, BrowserWindow, globalShortcut, ipcMain } from 'electron'
import {
  createProtocol,
} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
declare const __static: string
const isDevelopment: boolean = process.env.NODE_ENV !== 'production'

// Set correct userData path
isDevelopment
  ? app.setPath('userData', path.join(app.getPath('appData'), 'tamasi-dev'))
  : app.setPath('userData', path.join(app.getPath('appData'), 'tamasi'))

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null

// Standard scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    icon: path.join(__static, 'icon.png'),
    show: false,
    frame: false,
    webPreferences: { nodeIntegration: true },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.once('ready-to-show', win.show)

  win.on('closed', () => (win = null))
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') app.quit()
    })
  } else {
    process.on('SIGTERM', () => app.quit())
  }
}

// Title bar
ipcMain.on('minimizeWindow', () => win?.minimize())
ipcMain.on('changeWindowMaximization', () => {
  if (!win) return
  win.isMaximized() ? win.unmaximize() : win.maximize()
})
ipcMain.on('closeWindow', () => win?.close())

// Overlay
let formerWidth: number | null = null
let formerHeight: number | null = null

function initializeOverlay() {
  // Unregister global shortcuts in case they weren't properly unregistered
  globalShortcut.unregisterAll()

  globalShortcut.register('Home', () => win?.webContents.send('home'))
  globalShortcut.register('PageUp', () => win?.webContents.send('previousBoss'))
  globalShortcut.register('PageDown', () => win?.webContents.send('nextBoss'))
  globalShortcut.register('End', () => win?.webContents.send('incrementDeaths'))
  globalShortcut.register('Insert', () => win?.webContents.send('toggleTimer'))

  if (!win) return
  win.setAlwaysOnTop(true)
  ;[formerWidth, formerHeight] = win.getSize()
  win.setSize(330, 95)
}

function closeOverlay() {
  globalShortcut.unregisterAll()

  if (!win) return
  win.setAlwaysOnTop(false)
  win.setSize(formerWidth ?? 800, formerHeight ?? 600)
}

ipcMain.on('initializeOverlay', initializeOverlay)
ipcMain.on('closeOverlay', closeOverlay)
