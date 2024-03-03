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
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// 状態を永続化するためのnuxt-storageを使用
const inputText: Ref<string> = ref(NuxtStorage.localStorage.getData('inputText') || '');
const sampleText: Ref<string> = ref(
  NuxtStorage.localStorage.getData('sampleText') || 'ここにサンプルテキストを設定',
);
const isInputBlocked: Ref<boolean> = ref(
  NuxtStorage.localStorage.getData('isInputBlocked') || false,
);
const showShakyo: Ref<boolean> = ref(
  NuxtStorage.localStorage.getData('showShakyo') !== null
    ? NuxtStorage.localStorage.getData('showShakyo')
    : false,
);
const showSample: Ref<boolean> = ref(
  NuxtStorage.localStorage.getData('showSample') !== null
    ? NuxtStorage.localStorage.getData('showSample')
    : false,
);
const isTypo: Ref<boolean> = ref(NuxtStorage.localStorage.getData('isTypo') || false);
const isCompleted: Ref<boolean> = ref(
  NuxtStorage.localStorage.getData('isCompleted') || false,
);

// 状態を監視してlocalStorageに保存
watch(showShakyo, (newVal) => {
  NuxtStorage.localStorage.setData('showShakyo', newVal);
});
watch(showSample, (newVal) => {
  NuxtStorage.localStorage.setData('showSample', newVal);
});
watch(inputText, (newVal) => {
  NuxtStorage.localStorage.setData('inputText', newVal);
});
watch(sampleText, (newVal) => {
  NuxtStorage.localStorage.setData('sampleText', newVal);
});

const formattedSampleText = computed(() => {
  return sampleText.value.replace(/\n/g, '<br>');
});
// shakyo開始処理
const startShakyo = () => {
  showShakyo.value = true;
  sampleText.value = inputText.value;
  inputText.value = '';
  isInputBlocked.value = false;
  isCompleted.value = false; // ここでisCompletedもリセットする
  NuxtStorage.localStorage.setData('showShakyo', true);
  NuxtStorage.localStorage.removeItem('isCompleted');
};

const toggleSample = () => {
  showSample.value = !showSample.value;
  NuxtStorage.localStorage.setData('showSample', showSample.value);
};

const clearText = () => {
  inputText.value = '';
  isInputBlocked.value = false;
  isCompleted.value = false;
  isTypo.value = false;
  showShakyo.value = false; // これもリセットする
  NuxtStorage.localStorage.removeItem('inputText');
  NuxtStorage.localStorage.removeItem('isInputBlocked');
  NuxtStorage.localStorage.removeItem('isCompleted');
  NuxtStorage.localStorage.removeItem('isTypo');
  NuxtStorage.localStorage.removeItem('showShakyo');
};

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
