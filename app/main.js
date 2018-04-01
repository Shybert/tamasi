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
async function createWindow() {
    try {
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
    catch (err) {
        console.error(`Error while creating main window: ${err}`);
    }
}
// Wait for Electron to be ready before loading main window
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    // Don't quit on close if on MacOS
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (winMain === null) {
        createWindow();
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
        console.error(`Error while copying storage: ${err}`);
    }
}
//# sourceMappingURL=main.js.map