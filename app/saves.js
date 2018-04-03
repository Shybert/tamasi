"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const storage = __importStar(require("./storage"));
// Displaying new save overlay
async function displayNewSaveOverlay() {
    try {
        console.log("Showing the 'new save' overlay");
        const newSaveOverlay = document.getElementById('newSaveOverlay');
        newSaveOverlay.style.display = 'block';
    }
    catch (err) {
        console.error("Error while displaying the 'new save' overlay", err);
    }
}
exports.displayNewSaveOverlay = displayNewSaveOverlay;
// New save button clicked
async function newSaveClicked() {
    try {
        const newSaveName = document.getElementById('newSaveName').value;
        await storage.createSave(newSaveName);
        // Re-display the save list
        displaySaveList();
        // Hide the overlay
        document.getElementById('newSaveOverlay').style.display = 'none';
        console.log("'New save' overlay hidden");
    }
    catch (err) {
        console.error('Error while submitting new save', err);
    }
}
exports.newSaveClicked = newSaveClicked;
// Displaying save list
async function displaySaveList() {
    try {
        console.log('Displaying/Updating saves list');
        const saveList = document.getElementById('saveList');
        const gameId = sessionStorage.getItem('gameId');
        // Clear current list of saves
        saveList.innerHTML = '';
        console.log('Removed old save list elements');
        // Fetch saves
        const savesObj = await storage.getSaves(gameId);
        console.log();
        // Abort displaying if no saves have been created yet
        if (!savesObj) {
            console.log('No saves created yet');
            return;
        }
        // Insert the elements
        Object.values(savesObj).forEach((save) => {
            const li = document.createElement('li');
            const name = document.createTextNode(save.name);
            li.appendChild(name);
            saveList.appendChild(li);
        });
        console.log('Inserted save list elements');
    }
    catch (err) {
        console.error('Error when displaying save list', err);
    }
}
exports.displaySaveList = displaySaveList;
//# sourceMappingURL=saves.js.map