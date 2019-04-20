import { Store } from 'vuex'

export default function persistedStatePlugin(store: Store<any>): void {
  const savedState = localStorage.getItem('savedState')
  if (savedState) store.replaceState(JSON.parse(savedState))

  store.subscribe((mutation, state) => {
    localStorage.setItem('savedState', JSON.stringify(state))
  })
}
