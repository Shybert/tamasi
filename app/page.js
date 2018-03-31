"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const home = __importStar(require("./home"));
async function displayHomePage() {
    try {
        console.log('Displaying home page');
        // Hide other pages
        document.getElementById('saves').style.display = 'none';
        console.log('Hid other pages');
        // (Re)load the list of games
        home.displayGameList();
        console.log('(Re)loaded games list');
        // Display home page
        document.getElementById('home').style.display = 'block';
        console.log('Displayed home page');
    }
    catch (err) {
        console.error(`Error while displaying home page: ${err}`);
    }
}
exports.displayHomePage = displayHomePage;
//# sourceMappingURL=page.js.map