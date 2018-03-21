"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
// import * as path from 'path'
// import * as url from 'url'
// import {app, BrowserWindow} from 'electron'
const path = __importStar(require("path"));
const url = __importStar(require("url"));
const fs = __importStar(require("fs-extra"));
const electron_1 = require("electron");
// Keeping a global reference of the windows
let winIndex;
// Copy storage if it doesn't exist yet
copyStorage();
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
// Functions
// Copy the storage files to userdata
function copyStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Copying storage/ to userData');
            yield fs.copy('app/storage', path.join(electron_1.app.getPath('userData'), 'storage'), { overwrite: false });
            console.log('Copied storage/ to userData');
        }
        catch (err) {
            console.log(`Error while copying storage: ${err}`);
        }
    });
}
//# sourceMappingURL=main.js.map