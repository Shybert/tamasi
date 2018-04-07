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
const crypto = __importStar(require("crypto"));
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
        return gameNames;
    }
    catch (err) {
        console.error('Error while fetching game info:', err);
    }
}
exports.getGameNames = getGameNames;
async function getSaves(gameId) {
    try {
        console.log('Fetching list of saves');
        const saveList = await storageSaves.get(`games.${gameId}`);
        console.log('Fetched list of saves', saveList);
        return saveList;
    }
    catch (err) {
        console.error('Error while fetching list of saves:', err);
    }
}
exports.getSaves = getSaves;
async function createSave(name) {
    try {
        console.log('Creating a new save');
        let saveName = name;
        const gameId = localStorage.getItem('gameId');
        const gameInfo = storageData.get(`games.${gameId}`);
        const savePath = `games.${gameId}`;
        // Generate an ID for the save
        const saveId = crypto.randomBytes(16).toString('hex');
        // Check if a name has been provided
        if (!saveName) {
            // No name provided for save, use default name
            console.log('No name provided for save');
            saveName = gameInfo.name;
        }
        // Abort save creation if boss list is empty
        if (!gameInfo.bosses) {
            console.log('Boss list for game is empty, aborting save creation');
            return;
        }
        // Import boss list for the game
        const bossList = gameInfo.bosses;
        console.log('Imported boss list for the game');
        // Insert a 'time' property to each boss
        Object.keys(bossList).forEach((key) => {
            bossList[key].time = 0;
            bossList[key].deaths = 0;
        });
        console.log('Inserted time and death property to each boss');
        // Insert the info
        const saveInfo = {
            name: saveName,
            bosses: bossList
        };
        // Write the created save to saves.json
        storageSaves.set(`${savePath}.${saveId}`, saveInfo);
        console.log('Inserted new save information');
        console.log('Created new save');
    }
    catch (err) {
        console.error('Error while creating new save', err);
    }
}
exports.createSave = createSave;
//# sourceMappingURL=storage.js.map