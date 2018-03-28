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
createSaveButton.addEventListener('click', () => {
    console.log('New save creation');
    const newSaveName = document.getElementById('newSaveName').value;
    storage.createSave(newSaveName);
});
// Function for displaying save list
async function displaySaveList() {
    console.log('Displaying/Updating saves list');
    const saves = await storage.getSaves(id);
    for (let i = 0; i < saves.length; i += 1) {
        const saveList = document.getElementById('saveList');
        const li = document.createElement('li');
        const name = document.createTextNode(saves[i].name);
        li.appendChild(name);
        saveList.appendChild(li);
    }
}
//# sourceMappingURL=saves.js.map