"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Store = require('electron-store');
const storageSaves = new Store({ name: 'saves', cwd: 'storage' });
// Fetch the save ID and game ID for saving
const gameId = window.localStorage.getItem('gameId');
const saveId = window.localStorage.getItem('saveId');
console.log('Game ID / Save ID', gameId, saveId);
// Check if game ID or save ID is undefined
if (!gameId || !saveId) {
    console.warn('Game ID or save ID missing!');
}
displaySaveInfo();
async function displaySaveInfo() {
    try {
        const saveInfo = await storageSaves.get(`games.${gameId}.${saveId}`);
        console.log('Fetched save information', saveInfo);
        // Display the name of the save
        document.getElementById('saveName').innerHTML = saveInfo.name;
        console.log('Displayed save name');
        // Display boss information
        const saveInfoElement = document.getElementById('saveInfo');
        Object.values(saveInfo.bosses).forEach((bossInfo) => {
            const liParent = document.createElement('li');
            const ulBossInfo = document.createElement('ul');
            // Append boss name
            const bossName = document.createTextNode(`Name: ${bossInfo.name}`);
            const liBossName = document.createElement('li');
            liBossName.appendChild(bossName);
            ulBossInfo.appendChild(liBossName);
            // Append timer
            const bossTime = document.createTextNode(`Time: ${bossInfo.time}`);
            const liBossTime = document.createElement('li');
            liBossTime.appendChild(bossTime);
            ulBossInfo.appendChild(liBossTime);
            // Append deaths
            const bossDeaths = document.createTextNode(`Deaths: ${bossInfo.deaths}`);
            const liBossDeaths = document.createElement('li');
            liBossDeaths.appendChild(bossDeaths);
            ulBossInfo.appendChild(liBossDeaths);
            liParent.appendChild(ulBossInfo);
            saveInfoElement.appendChild(liParent);
        });
        console.log('Displayed save information');
    }
    catch (err) {
        console.error('Error while displaying save information:', err);
    }
}
//# sourceMappingURL=overlay.js.map