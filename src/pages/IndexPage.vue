<template>
  <div class="container my-4">
    <div class="row">
      <div class="col-md-12">
        <textarea
          class="form-control"
          :class="{ 'bg-danger': isInputBlocked }"
          v-model="inputText"
          placeholder="ここにテキストを入力"
        ></textarea>
        <div class="formatted-text" v-html="formattedInputText"></div>
        <div v-if="inputError" class="alert alert-danger">
          {{ inputError }}
        </div>
<!-- 既存のテキストエリアとボタンのコード -->
        <button class="btn btn-primary my-2" @click="startShakyo">
          shakyo開始
        </button>
        <button class="btn btn-secondary my-2" @click="clearText">
          クリア
        </button>
        <!-- クリアボタンの追加 -->
      </div>
    </div>
    <div v-if="showShakyo" class="alert-container">
      <div v-if="isTypo" class="alert alert-danger alert-fade-out">Miss!</div>
      <div v-if="isCompleted" class="alert alert-success">Complete!</div>
      <!-- その他の要素 -->
    </div>
    <div v-if="showShakyo">
      <div class="row">
        <div class="col-md-6">
          <div v-if="showSample" class="card">
            <div class="card-body" v-html="formattedSampleText"></div>
          </div>
          <button class="btn btn-secondary my-2" @click="toggleSample">
            見本を隠す/表示する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, watch, computed } from 'vue';
import type { Ref } from 'vue';
import { useStore } from 'vuex';
import { storeKey } from 'src/store'; // 適切なパスに修正してください

const store = useStore(storeKey);

// Vuexストアの状態をリアクティブに参照するcomputedプロパティ
const inputText = computed({
  get: () => store.state.shakyo.inputText,
  set: (value) => store.commit('shakyo/setInputText', value)
});

const sampleText = computed(() => store.state.shakyo.sampleText);

const isInputBlocked = computed(() => store.state.shakyo.isInputBlocked);

const showShakyo = computed({
  get: () => store.state.shakyo.showShakyo,
  set: (value) => store.commit('shakyo/setShowShakyo', value)
});

const showSample = computed({
  get: () => store.state.shakyo.showSample,
  set: (value) => store.commit('shakyo/setShowSample', value)
});

const isTypo = computed(() => store.state.shakyo.isTypo);

const isCompleted = computed(() => store.state.shakyo.isCompleted);

// Vuexストアの状態を更新するためのメソッド
const startShakyo = () => {
  store.dispatch('shakyo/startShakyo');
};

const toggleSample = () => {
  showSample.value = !showSample.value;
};

const clearText = () => {
  store.dispatch('shakyo/clearText');
};

// 状態変更を監視して自動的にストアを更新
watch(showShakyo, (newVal) => {
  store.commit('shakyo/setShowShakyo', newVal);
});
watch(showSample, (newVal) => {
  store.commit('shakyo/setShowSample', newVal);
});
watch(inputText, (newVal) => {
  store.commit('shakyo/setInputText', newVal);
});
watch(sampleText, (newVal) => {
  store.commit('shakyo/setSampleText', newVal);
});

// サンプルテキストをHTMLにフォーマット
const formattedSampleText = computed(() => {
  return sampleText.value.replace(/\n/g, '<br>');
});

const inputError: Ref<string> = ref(''); // エラーメッセージ用のリファレンス
// 既に宣言されている場合は、以下は不要です
const formattedInputText: Ref<string> = ref('');
const checkInput = () => {
  if (showShakyo.value) {
    // 正しい部分の長さを特定
    let correctLength = 0;
    while (correctLength < inputText.value.length && inputText.value[correctLength] === sampleText.value[correctLength]) {
      correctLength++;
    }

    // 正しい部分と間違った部分を分離
    const correctPart = inputText.value.substring(0, correctLength);
    const incorrectPart = inputText.value.substring(correctLength);

    // 間違った部分があれば赤くする
    if (incorrectPart) {
      formattedInputText.value = `${correctPart}<span class='my-text-error'>${incorrectPart}</span>`;
      isInputBlocked.value = true;
    } else {
      formattedInputText.value = inputText.value; // 全部正しい場合
      isInputBlocked.value = false;
    }

    isCompleted.value = inputText.value === sampleText.value;
    inputError.value = isInputBlocked.value ? '入力したテキストが一致しません' : '';
  }
};


// ユーザーの入力を監視
watch(inputText, checkInput);
</script>

<style>
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.alert-fade-out {
  animation: fadeOut 2s ease-out;
}
.alert-container {
  height: 100px; /* 高さを確保 */
  line-height: 50px; /* テキストを中央に配置 */
}

.my-text-error {
  color: red;
}
/* その他のスタイル */
</style>
