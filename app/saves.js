"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const electron_1 = require("electron");
// Getting the global game ID
const id = electron_1.remote.getGlobal('sharedObject').id;
console.log(`Global game ID: ${id}`);
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
    console.log(`New save name: ${newSaveName}`);
});
//# sourceMappingURL=saves.js.map