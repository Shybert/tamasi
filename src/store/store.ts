import { reactive, watch } from '@vue/composition-api'

interface IStore<State> {
  id: string
  state: State
}

export function createStore<State>(
  id: string,
  state: State
): () => IStore<State> {
  const savedState = localStorage.getItem(`${id}State`)
  const store: IStore<State> = {
    id,
    state: savedState ? reactive(JSON.parse(savedState)) : reactive(state)
  }

  watch(() => {
    localStorage.setItem(`${id}State`, JSON.stringify(store.state))
  })

  return () => store
}
