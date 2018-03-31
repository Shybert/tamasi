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
async function displayGameList() {
    try {
        console.log('Displaying list of games');
        // Get and clear current list
        const gamesList = document.getElementById('gamesList');
        gamesList.innerHTML = '';
        console.log('Cleared gamesList element');
        // Fetch the list of game names
        const gameNames = await storage.getGameNames();
        console.log('Fetched list of game names', gameNames);
        // Create the elements
        for (let i = 0; i < gameNames.length; i += 1) {
            const li = document.createElement('li');
            const text = document.createTextNode(gameNames[i].name);
            li.setAttribute('id', gameNames[i].id);
            li.appendChild(text);
            // Listening for clicks on the game names for opening the save window
            li.addEventListener('click', (event) => {
                const id = event.target.id;
                console.log(`Game with ID '${id}' clicked`);
                // Open save window...
                //
                //
            });
            gamesList.appendChild(li);
        }
        console.log('Appended new list of games');
    }
    catch (err) {
        console.error(`Error while displaying list of games: ${err}`);
    }
}
exports.displayGameList = displayGameList;
//# sourceMappingURL=home.js.map