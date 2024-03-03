import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import { Router } from 'vue-router'
import shakyo from './module/shakyo'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export interface StateInterface {
  example: unknown
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')
declare module 'vuex' {
  export interface Store<S> {
    readonly $router: Router;
  }
}
export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      shakyo
    },
    plugins: [
      createPersistedState({
      })
    ],
    strict: !!process.env.DEBUGGING
  })

  return Store;
})

export function useStore() {
  return vuexUseStore(storeKey)
}
