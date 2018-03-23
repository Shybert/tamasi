import {remote} from 'electron'

// Getting the global game ID
const id: string = remote.getGlobal('sharedObject').id
console.log(id)
