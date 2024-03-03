// store/shakyo.ts

interface ShakyoState {
  inputText: string;
  sampleText: string;
  isInputBlocked: boolean;
  showShakyo: boolean;
  showSample: boolean;
  isTypo: boolean;
  isCompleted: boolean;
}

export default {
  namespaced: true,
  state: (): ShakyoState => ({
    inputText: '',
    sampleText: 'ここにサンプルテキストを設定',
    isInputBlocked: false,
    showShakyo: false,
    showSample: false,
    isTypo: false,
    isCompleted: false,
  }),
  mutations: {
    setInputText(state: ShakyoState, value: string) {
      state.inputText = value;
    },
    setSampleText(state: ShakyoState, value) {
      state.sampleText = value;
    },
    setIsInputBlocked(state: ShakyoState, value) {
      state.isInputBlocked = value;
    },
    setShowShakyo(state: ShakyoState, value) {
      state.showShakyo = value;
    },
    setShowSample(state: ShakyoState, value) {
      state.showSample = value;
    },
    setIsTypo(state: ShakyoState, value) {
      state.isTypo = value;
    },
    setIsCompleted(state: ShakyoState, value) {
      state.isCompleted = value;
    },
    clearText(state: ShakyoState) {
      state.inputText = '';
      state.isInputBlocked = false;
      state.isCompleted = false;
      state.isTypo = false;
      state.showShakyo = false;
      state.showSample = false; // 必要に応じて追加
    },
    startShakyo(state: ShakyoState) {
      state.showShakyo = true;
      state.sampleText = state.inputText;
      state.inputText = '';
      state.isInputBlocked = false;
      state.isCompleted = false;
    },
    toggleSample(state: ShakyoState) {
      state.showSample = !state.showSample;
    }
  },
  actions: {
    updateInputText({ commit }, value) {
      commit('setInputText', value);
    },
    startShakyoProcess({ commit }) {
      commit('startShakyo');
    },
    toggleSampleVisibility({ commit }) {
      commit('toggleSample');
    },
    clearAllText({ commit }) {
      commit('clearText');
    }
    // 他のアクションをここに追加
  },
  getters: {
    inputText: (state: ShakyoState) => state.inputText,
    sampleText: (state: ShakyoState) => state.sampleText,
    isInputBlocked: (state: ShakyoState) => state.isInputBlocked,
    showShakyo: (state: ShakyoState) => state.showShakyo,
    showSample: (state: ShakyoState) => state.showSample,
    isTypo: (state: ShakyoState) => state.isTypo,
    isCompleted: (state: ShakyoState) => state.isCompleted,
    formattedSampleText: (state: ShakyoState) => {
      return state.sampleText.replace(/\n/g, '<br>');
    }
    // 他のゲッターをここに追加
  },
};
