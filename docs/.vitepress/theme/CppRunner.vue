<template>
  <div class="cpp-runner">
    <!-- 程式碼區塊 + 執行按鈕疊在右上角 -->
    <div ref="codeWrapper" class="code-wrapper">
      <slot />
      <button
        @click="run"
        :disabled="loading"
        class="run-btn"
        :title="loading ? '編譯中...' : '執行程式'"
      >
        <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" class="spin">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
        </svg>
      </button>
    </div>

    <!-- stdin 輸入（有 has-stdin 時才顯示 checkbox） -->
    <div v-if="hasStdin" class="stdin-bar">
      <label class="stdin-label">
        <input type="checkbox" v-model="showStdin" />
        <span>自訂輸入 (stdin)</span>
      </label>
    </div>
    <div v-if="showStdin" class="stdin-area">
      <textarea
        v-model="stdinText"
        placeholder="在此輸入程式所需的資料（每行一組）..."
        rows="3"
      />
    </div>

    <!-- 輸出結果 -->
    <div v-if="output !== null" class="output-area">
      <div class="output-header">
        <span>{{ isError ? '⚠ 編譯 / 執行錯誤' : '▶ 輸出結果' }}</span>
        <span class="clear-btn" @click="output = null">✕</span>
      </div>
      <pre :class="['output-content', { 'is-error': isError }]">{{ output }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  hasStdin: { type: Boolean, default: false },
  wrap:     { type: Boolean, default: false },
})

const codeWrapper = ref(null)
const loading     = ref(false)
const output      = ref(null)
const isError     = ref(false)
const stdinText   = ref('')
const showStdin   = ref(false)

const getCode = () => codeWrapper.value?.querySelector('code')?.textContent ?? ''

const run = async () => {
  const raw = getCode()
  if (!raw.trim()) return

  const codeToRun = props.wrap
    ? `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n${raw}\n    return 0;\n}`
    : raw

  loading.value = true
  output.value  = null
  isError.value = false

  try {
    const res = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'gcc-head',
        code: codeToRun,
        options: 'c++17',
        stdin: stdinText.value,
      }),
    })
    const data = await res.json()
    if (data.compiler_error) {
      output.value = data.compiler_error
      isError.value = true
    } else {
      output.value = (data.program_output ?? '') + (data.program_error ?? '')
      if (!output.value.trim()) output.value = '（程式執行完畢，無輸出）'
    }
  } catch {
    output.value = '⚠ 連線失敗，請確認網路後再試'
    isError.value = true
  }

  loading.value = false
}
</script>

<style scoped>
/* ── 外層容器：不加額外邊框，直接貼著程式碼區塊 ── */
.cpp-runner {
  margin: 16px 0;
}

/* ── 程式碼包覆層：讓按鈕可以 absolute 定位 ── */
.code-wrapper {
  position: relative;
}

/* 讓 slot 內的 VitePress 程式碼區塊邊距歸零 */
.code-wrapper :deep(div[class*='language-']) {
  margin: 0;
}

/* ── 執行按鈕：仿照 VitePress 複製按鈕風格 ── */
.run-btn {
  position: absolute;
  top: 12px;
  /* 複製按鈕在 right:12px 寬約 40px，我們放在它左邊 */
  right: 56px;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid var(--vp-code-copy-code-border-color, transparent);
  background: var(--vp-code-copy-code-bg, transparent);
  color: var(--vp-c-text-2);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.25s, color 0.2s, background 0.2s;
}

/* hover 整個 code-wrapper 才顯示（跟複製按鈕同行為） */
.code-wrapper:hover .run-btn,
.run-btn:focus {
  opacity: 1;
}

.run-btn:hover:not(:disabled) {
  color: var(--vp-c-brand-1);
  background: var(--vp-code-copy-code-hover-bg, rgba(128,128,128,.1));
}

.run-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 轉圈動畫 */
.spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── stdin 列 ── */
.stdin-bar {
  padding: 6px 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-top: none;
}
.stdin-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  user-select: none;
}
.stdin-area {
  padding: 8px 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-top: none;
}
.stdin-area textarea {
  width: 100%;
  padding: 6px 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  resize: vertical;
  box-sizing: border-box;
}

/* ── 輸出區 ── */
.output-area {
  border: 1px solid var(--vp-c-divider);
  border-top: none;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
}
.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}
.clear-btn {
  cursor: pointer;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.clear-btn:hover { color: var(--vp-c-text-1); }

.output-content {
  margin: 0;
  padding: 12px 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
}
.output-content.is-error {
  color: var(--vp-c-danger-1, #e53e3e);
}
</style>
