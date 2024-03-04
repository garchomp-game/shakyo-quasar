import { Module } from 'vuex';
import { StateInterface } from '../index'; // 適切なパスに修正してください
import { ShakyoState } from 'src/types/shakyo'; // 適切なパスに修正してください

export const shakyoModule: Module<ShakyoState, StateInterface> = {
  namespaced: true,
  state: {
    inputText: '',
    sampleText: 'ここにサンプルテキストを設定',
    isInputBlocked: false,
    showShakyo: false,
    showSample: false,
    isTypo: false,
    isCompleted: false,
  },
  mutations: {
    setInputText(state, value: string) {
      state.inputText = value;
    },
    setShowSample(state, value: boolean) {
      state.showSample = value;
    },
    setIsInputBlocked(state, value: boolean) {
      state.isInputBlocked = value;
    },
    setIsCompleted(state, value: boolean) {
      state.isCompleted = value;
    },
    // 必要に応じて他のmutationsを追加
    clearText(state) {
      state.inputText = '';
      state.isInputBlocked = false;
      state.showShakyo = false;
      state.showSample = false;
      state.isTypo = false;
      state.isCompleted = false;
    },
    startShakyo(state) {
      // startShakyoProcess アクションによって呼び出される
      state.showShakyo = true;
      state.sampleText = state.inputText;
      state.inputText = '';
      state.isInputBlocked = false;
      state.isCompleted = false;
    }
  },
  actions: {
    updateInputText({ commit }, value: string) {
      commit('setInputText', value);
    },
    toggleSampleVisibility({ commit, state }) {
      commit('setShowSample', !state.showSample);
    },
    startShakyoProcess({ commit }) {
      commit('startShakyo');
    },
    clearAllText({ commit }) {
      commit('clearText');
    },
    // 他のactions...
  },
  getters: {
    formattedSampleText: (state) => {
      return state.sampleText.replace(/\n/g, '<br>');
    },
    // 他のgetters...
  },
};
