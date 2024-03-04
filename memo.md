次に、以下の元のnuxtstorageのコードを参考にして進めていきます。

元のコードは以下の通りでした。

```ts

// 状態を監視してlocalStorageに保存
watch(showShakyo, (newVal) => {
  NuxtStorage.localStorage.setData("showShakyo", newVal);
});
watch(showSample, (newVal) => {
  NuxtStorage.localStorage.setData("showSample", newVal);
});
watch(inputText, (newVal) => {
  NuxtStorage.localStorage.setData("inputText", newVal);
});
watch(sampleText, (newVal) => {
  NuxtStorage.localStorage.setData("sampleText", newVal);
});

const formattedSampleText = computed(() => {
  return sampleText.value.replace(/\n/g, "<br>");
});
// shakyo開始処理
const startShakyo = () => {
  showShakyo.value = true;
  sampleText.value = inputText.value;
  inputText.value = "";
  isInputBlocked.value = false;
  isCompleted.value = false; // ここでisCompletedもリセットする
  NuxtStorage.localStorage.setData("showShakyo", true);
  NuxtStorage.localStorage.removeItem("isCompleted");
};

const toggleSample = () => {
  showSample.value = !showSample.value;
  NuxtStorage.localStorage.setData("showSample", showSample.value);
};

const clearText = () => {
  inputText.value = "";
  isInputBlocked.value = false;
  isCompleted.value = false;
  isTypo.value = false;
  showShakyo.value = false; // これもリセットする
  NuxtStorage.localStorage.removeItem("inputText");
  NuxtStorage.localStorage.removeItem("isInputBlocked");
  NuxtStorage.localStorage.removeItem("isCompleted");
  NuxtStorage.localStorage.removeItem("isTypo");
  NuxtStorage.localStorage.removeItem("showShakyo");
};

const inputError: Ref<string> = ref(""); // エラーメッセージ用のリファレンス
// 既に宣言されている場合は、以下は不要です
const formattedInputText: Ref<string> = ref("");
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
      formattedInputText.value = `${correctPart}<span class="my-text-error">${incorrectPart}</span>`;
      isInputBlocked.value = true;
    } else {
      formattedInputText.value = inputText.value; // 全部正しい場合
      isInputBlocked.value = false;
    }

    isCompleted.value = inputText.value === sampleText.value;
    inputError.value = isInputBlocked.value ? "入力したテキストが一致しません" : "";
  }
};


// ユーザーの入力を監視
watch(inputText, checkInput);
```

これを、shakyo.ts二反映していきたいです。
