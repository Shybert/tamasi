"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const electron_1 = require("electron");
const Store = require('electron-store');
const storageData = new Store({ name: 'data', cwd: 'storage' });
const storageSaves = new Store({ name: 'saves', cwd: 'storage' });
async function getGameNames() {
    try {
        console.log('Fetching game names');
        const gameInfo = storageData.get(`games`);
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
        console.error(`Error while fetching game info: ${err}`);
    }
}
exports.getGameNames = getGameNames;
async function getSaves(gameId) {
    try {
        console.log('Fetching list of saves');
        return storageSaves.get(`games.${gameId}`);
    }
    catch (err) {
        console.error(`Error while fetching list of saves: ${err}`);
    }
}
exports.getSaves = getSaves;
async function createSave(name) {
    try {
        console.log('Creating a new save');
        let saveName = name;
        const gameId = electron_1.remote.getGlobal('sharedObject').id;
        const gameInfo = storageData.get(`games.${gameId}`);
        const savePath = `games.${gameId}`;
        // Check if a name has been provided
        if (!saveName) {
            // No name provided for save, use default name
            console.log('No name provided for save');
            saveName = gameInfo.name;
        }
        // Check if game has had an entry yet
        if (!storageSaves.has(savePath)) {
            console.log("Game hasn't been inserted yet");
            storageSaves.set(savePath, []);
            console.log('Initialized game');
        }
        // Import boss list for the game
        const bossList = gameInfo.bosses; // eslint-disable-line no-use-before-define
        console.log('Imported boss list for the game');
        // Insert a 'time' property to each boss
        Object.keys(bossList).forEach((key) => {
            bossList[key].time = 0;
        });
        console.log('Inserted time property to each boss');
        // Insert the info
        const saveInfo = {
            name: saveName,
            bosses: bossList
        };
        // Fetching the saves array, pushing to it, and then inserting it again
        const saves = storageSaves.get(savePath);
        saves.push(saveInfo);
        storageSaves.set(savePath, saves);
        console.log('Inserted new save info');
        console.log('Created new save');
    }
    catch (err) {
        console.error(`Error while creating new save: ${err}`);
    }
}
exports.createSave = createSave;
//# sourceMappingURL=storage.js.map