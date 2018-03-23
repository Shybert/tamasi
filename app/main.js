"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const url = __importStar(require("url"));
const fs = __importStar(require("fs-extra"));
const electron_1 = require("electron");
// Keeping a global reference of the windows
let winMain;
// Copy storage if it doesn't exist yet
copyStorage();
function createMainWindow() {
    winMain = new electron_1.BrowserWindow();
    winMain.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Dereference window when closed
    winMain.on('closed', () => {
        winMain = null;
    });
}
// Wait for Electron to be ready before loading main window
electron_1.app.on('ready', createMainWindow);
electron_1.app.on('window-all-closed', () => {
    // Don't quit on close if on MacOS
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (winMain === null) {
        createMainWindow();
    }
});
// IPC
electron_1.ipcMain.on('openSaveWindow', async (event, id) => {
    try {
        console.log(`Loading save window with game ID '${id}'`);
        loadWindow('saves');
        // Sending the game ID
        console.log('Setting global game ID variable');
        global.sharedObject = {
            id
        };
    }
    catch (err) {
        console.log(`Error while processing openSaveWindow IPC req: ${err}`);
    }
});
// Functions
// Copy the storage files to userdata
async function copyStorage() {
    try {
        console.log('Copying storage/ to userData');
        await fs.copy('app/storage', path.join(electron_1.app.getPath('userData'), 'storage'), { overwrite: false });
        console.log('Copied storage/ to userData');
    }
    catch (err) {
        console.log(`Error while copying storage: ${err}`);
    }
}
// Load a new window
async function loadWindow(name) {
    try {
        console.log(`Loading new window ${name}.html`);
        winMain.loadURL(url.format({
            pathname: path.join(__dirname, `${name}.html`),
            protocol: 'file:',
            slashes: true
        }));
    }
    catch (err) {
        console.log(`Error while trying to load a new window: ${err}`);
    }
}
//# sourceMappingURL=main.js.map