import { reactive, watchEffect } from '@vue/composition-api'

interface Store<State> {
  id: string
  state: State
}

export function createStore<State>(
  id: string,
  state: State
): () => Store<State> {
  const savedState = localStorage.getItem(`${id}State`)
  const store: Store<State> = {
    id,
    state: savedState ? reactive(JSON.parse(savedState)) : reactive(state),
  }

  watchEffect(() => {
    localStorage.setItem(`${id}State`, JSON.stringify(store.state))
  })

  return () => store
}
