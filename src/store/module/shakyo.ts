// store/shakyo.ts
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
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
    setInputText(state, inputText) {
      state.inputText = inputText;
    },
    setSampleText(state, sampleText) {
      state.sampleText = sampleText;
    },
    setIsInputBlocked(state, isInputBlocked) {
      state.isInputBlocked = isInputBlocked;
    },
    setShowShakyo(state, showShakyo) {
      state.showShakyo = showShakyo;
    },
    setShowSample(state, showSample) {
      state.showSample = showSample;
    },
    setIsTypo(state, isTypo) {
      state.isTypo = isTypo;
    },
    setIsCompleted(state, isCompleted) {
      state.isCompleted = isCompleted;
    },
    clearText(state) {
      state.inputText = '';
      state.isInputBlocked = false;
      state.isCompleted = false;
      state.isTypo = false;
      state.showShakyo = false;
    },
    startShakyo(state) {
      state.showShakyo = true;
      state.sampleText = state.inputText;
      state.inputText = '';
      state.isInputBlocked = false;
      state.isCompleted = false;
    },
    toggleSample(state) {
      state.showSample = !state.showSample;
    }
  },
  actions: {
    // ここにアクションを追加 (例: APIからデータを取得して状態を更新)
  },
  plugins: [createPersistedState()],
});
