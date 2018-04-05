"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const electron_1 = require("electron");
const home = __importStar(require("./home"));
const saves = __importStar(require("./saves"));
async function displayHomePage() {
    try {
        console.log('Displaying home page');
        hidePages();
        // (Re)load the list of games
        home.displayGameList();
        console.log('(Re)loaded games list');
        // Display home page
        document.getElementById('home').style.display = 'block';
        console.log('Displayed home page');
    }
    catch (err) {
        console.error(`Error while displaying home page: ${err}`);
    }
}
exports.displayHomePage = displayHomePage;
async function displaySavesPage() {
    try {
        console.log('Displaying saves page');
        hidePages();
        // Display saves page
        saves.displaySaveList();
        document.getElementById('saves').style.display = 'block';
        console.log('Displayed saves page');
    }
    catch (err) {
        console.error('Error while displaying saves page', err);
    }
}
exports.displaySavesPage = displaySavesPage;
async function displayOverlayPage() {
    try {
        console.log('Displaying overlay');
        // Send load overlay message to main process
        electron_1.ipcRenderer.send('loadOverlay');
    }
    catch (err) {
        console.error('Error while displaying overlay:', err);
    }
}
exports.displayOverlayPage = displayOverlayPage;
// The single function for hiding all the pages
async function hidePages() {
    try {
        console.log('Hiding pages');
        // Fetch all child nodes for the 'content' div, since these are the pages
        const pages = document.getElementById('content').children;
        // Loop through the pages and hide them
        for (let i = 0; i < pages.length; i += 1) {
            pages[i].style.display = 'none';
        }
    }
    catch (err) {
        console.error('Error while hiding pages:', err);
    }
}
//# sourceMappingURL=page.js.map