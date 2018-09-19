interface ISavesState {
  showNewSaveOverlay: boolean
}

const state: ISavesState = {
  showNewSaveOverlay: false
}

const mutations = {
  toggleNewSaveOverlay (state: ISavesState, payload: {showNewSaveOverlay: boolean}) {
    state.showNewSaveOverlay = payload.showNewSaveOverlay
  }
}

export default {
  state,
  mutations
}
