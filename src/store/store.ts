import { ref, Ref, watch } from '@vue/composition-api'

interface IStore<State> {
  id: string
  state: Ref<State>
}

export function createStore<State>(id: string, state: State): IStore<State> {
  const savedState = localStorage.getItem(`${id}State`)
  const store: IStore<State> = {
    id,
    state: savedState ? ref(JSON.parse(savedState)) : ref(state)
  }

  watch(() => {
    localStorage.setItem(`${id}State`, JSON.stringify(store.state.value))
  })

  return store
}
