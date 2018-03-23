"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const Store = require('electron-store');
const store = new Store({ name: 'data', cwd: 'storage' });
// Initially getting all game info
console.log('Fetching game info');
const gameInfo = store.get('games');
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
//# sourceMappingURL=storage.js.map