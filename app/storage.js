"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const electron_1 = require("electron");
const Store = require('electron-store');
const storageData = new Store({ name: 'data', cwd: 'storage' });
const storageSaves = new Store({ name: 'saves', cwd: 'storage' });
// Initially getting all game info
console.log('Fetching game info');
const gameInfo = storageData.get('games');
console.log('Fetched game info');
async function getGameNames() {
    try {
        console.log('Fetching game names');
        const gameNames = [];
        console.log('Putting names and IDs into an array');
        Object.entries(gameInfo).forEach(([key, value]) => {
            const gameName = {
                id: key,
                name: value.name
            };
            gameNames.push(gameName);
        });
        console.log('Finished fetching game names');
        return gameNames;
    }
    catch (err) {
        console.log(`Error while fetching game info: ${err}`);
    }
}
exports.getGameNames = getGameNames;
async function getSaves(gameId) {
    console.log('Fetching list of saves');
    return storageSaves.get(`games.${gameId}`);
}
exports.getSaves = getSaves;
async function createSave(name) {
    try {
        const gameId = electron_1.remote.getGlobal('sharedObject').id;
        const savePath = `games.${gameId}`;
        console.log(`Creating new save with the name '${name}' for game ID '${gameId}'`);
        // Check if game has had an entry yet
        if (!storageSaves.has(savePath)) {
            console.log("Game hasn't been inserted yet");
            storageSaves.set(savePath, []);
            console.log('Initialized game');
        }
        // Import boss list for the game
        const bossList = storageData.get(`games.${gameId}.bosses`);
        console.log('Imported boss list for the game');
        // Insert a 'time' property to each boss
        Object.keys(bossList).forEach((key) => {
            bossList[key].time = 0;
        });
        console.log('Inserted time property to each boss');
        // Insert the info
        const saveInfo = {
            name,
            bosses: bossList
        };
        // Fetching the saves array, pushing to it, and then inserting it again
        const saves = storageSaves.get(savePath);
        saves.push(saveInfo);
        storageSaves.set(savePath, saves);
        console.log('Created new save');
    }
    catch (err) {
        console.log(`Error while creating new save: ${err}`);
    }
}
exports.createSave = createSave;
//# sourceMappingURL=storage.js.map