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
const electron_1 = require("electron");
// Keeping a global reference of the windows
let winIndex;
function createMainWindow() {
    winIndex = new electron_1.BrowserWindow();
    winIndex.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Dereference window when closed
    winIndex.on('closed', () => {
        winIndex = null;
    });
}
// Wait for Electron to be ready before loading main window
electron_1.app.on('ready', createMainWindow);
electron_1.app.on('window-all-closed', () => {
    // Don't quit on close if on MacOS
    if (process.platform === 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (winIndex === null) {
        createMainWindow();
    }
});
//# sourceMappingURL=main.js.map