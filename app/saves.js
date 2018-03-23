"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Getting the global game ID
const id = electron_1.remote.getGlobal('sharedObject').id;
console.log(id);
//# sourceMappingURL=saves.js.map