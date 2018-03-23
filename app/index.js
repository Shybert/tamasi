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
const storage = __importStar(require("./storage"));
const electron_1 = require("electron");
displayGameList();
async function displayGameList() {
    try {
        // Get the list of game names
        const gameNames = await storage.getGameNames();
        // Create the elements
        console.log('Creating game name elements');
        const gamesList = document.getElementById('gamesList');
        for (let i = 0; i < gameNames.length; i += 1) {
            const li = document.createElement('li');
            const text = document.createTextNode(gameNames[i].name);
            li.setAttribute('id', gameNames[i].id);
            li.appendChild(text);
            // Listening for clicks on the game names for opening the save window
            li.addEventListener('click', (event) => {
                const id = event.target.id;
                console.log(`Game with ID '${id}' clicked`);
                // Send the ID of the clicked name to main.js
                electron_1.ipcRenderer.send('openSaveWindow', id);
            });
            gamesList.appendChild(li);
        }
    }
    catch (err) {
        console.log(`Error while displaying list of games: ${err}`);
    }
}
//# sourceMappingURL=index.js.map