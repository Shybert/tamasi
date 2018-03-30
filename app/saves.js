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
const storage = __importStar(require("./storage"));
// Getting the global game ID
const id = electron_1.remote.getGlobal('sharedObject').id;
console.log(`Global game ID: ${id}`);
// Call function for displaying save list
displaySaveList();
// Detecting new save button presses
const newSaveButton = document.getElementById('newSaveButton');
newSaveButton.addEventListener('click', () => {
    console.log('New save button pressed');
    const newSaveOverlay = document.getElementById('newSaveOverlay');
    console.log('Showing the new save overlay');
    newSaveOverlay.style.display = 'block';
});
// Detecting new save submits
const createSaveButton = document.getElementById('createSaveButton');
createSaveButton.addEventListener('click', async () => {
    console.log('New save creation');
    const newSaveName = document.getElementById('newSaveName').value;
    await storage.createSave(newSaveName);
    // Re-display the save list
    displaySaveList();
    // Hide the overlay
    document.getElementById('newSaveOverlay').style.display = 'none';
    console.log('New save overlay hidden');
});
// Function for displaying save list
async function displaySaveList() {
    console.log('Displaying/Updating saves list');
    const saves = await storage.getSaves(id);
    const saveList = document.getElementById('saveList');
    saveList.innerHTML = '';
    console.log('Removed old save list elements');
    // Check if game has been inserted yet / any saves have been made
    if (!saves || saves.length === 0) {
        console.log('No saves created yet');
        return;
    }
    for (let i = 0; i < saves.length; i += 1) {
        const li = document.createElement('li');
        const name = document.createTextNode(saves[i].name);
        li.appendChild(name);
        saveList.appendChild(li);
    }
    console.log('Inserted save list elements');
}
//# sourceMappingURL=saves.js.map