<template>
  <div class="cpp-runner">
    <!-- 程式碼區塊（純顯示，不覆蓋按鈕） -->
    <div ref="codeWrapper" class="code-wrapper">
      <slot />
    </div>

    <!-- 底部工具列：stdin checkbox 靠左，執行按鈕靠右 -->
    <div class="run-toolbar">
      <label v-if="hasStdin" class="stdin-label">
        <input type="checkbox" v-model="showStdin" />
        <span>自訂輸入 (stdin)</span>
      </label>
      <span v-else />
      <button
        @click="run"
        :disabled="loading"
        class="run-btn"
        :title="loading ? '編譯中...' : '執行程式'"
      >
        <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" class="spin">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
        </svg>
        <span>{{ loading ? '編譯中...' : '執行' }}</span>
      </button>
    </div>

    <!-- stdin 輸入區 -->
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
        <span>{{ isError ? '⚠ 編譯 / 執行錯誤' : '輸出結果' }}</span>
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

/* ── 程式碼包覆層 ── */
.code-wrapper :deep(div[class*='language-']) {
  margin: 0;
}

/* ── 底部工具列 ── */
.run-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px 6px 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-top: none;
}

/* ── 執行按鈕：文字 + 圖示，靠右顯示 ── */
.run-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 12px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.run-btn:hover:not(:disabled) {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.run-btn:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

/* 轉圈動畫 */
.spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── stdin 列 ── */
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
