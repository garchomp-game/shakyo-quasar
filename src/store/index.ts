import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import { shakyoModule } from './module/shakyo'
import { ShakyoState } from 'src/types/shakyo'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export interface StateInterface {
  shakyo: ShakyoState;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      shakyo: shakyoModule
    },
    plugins: [
      createPersistedState()
    ],
    strict: !!process.env.DEBUGGING
  })

  return Store;
})

export function useStore() {
  return vuexUseStore(storeKey)
}
