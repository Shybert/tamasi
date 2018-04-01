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
const page = __importStar(require("./page"));
const saves = __importStar(require("./saves"));
// Event listeners
// Detecting new save button presses
const newSaveButton = document.getElementById('newSaveButton');
newSaveButton.addEventListener('click', saves.displayNewSaveOverlay);
// Detecting new save submits
const createSaveButton = document.getElementById('createSaveButton');
createSaveButton.addEventListener('click', saves.newSaveClicked);
// Home button press
const homeButton = document.getElementById('homeButton');
homeButton.addEventListener('click', page.displayHomePage);
page.displayHomePage();
//# sourceMappingURL=index.js.map