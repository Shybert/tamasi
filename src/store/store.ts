import { ref, Ref } from '@vue/composition-api'

interface IStore<State> {
  state: Ref<State>
}

export function createStore<State>(state: State): IStore<State> {
  const store: IStore<State> = {
    state: ref(state)
  }

  return store
}
