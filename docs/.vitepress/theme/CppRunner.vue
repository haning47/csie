<template>
  <div class="cpp-runner">
    <!-- 原始程式碼（slot，檢視模式） -->
    <div ref="codeWrapper" class="code-wrapper" v-show="!editMode">
      <slot />
    </div>

    <!-- 使用者編輯區（編輯模式） -->
    <div v-if="editMode" class="edit-area">
      <textarea
        v-model="editCode"
        class="edit-textarea"
        spellcheck="false"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        :rows="Math.max(editCode.split('\n').length + 1, 5)"
      />
    </div>

    <!-- 底部工具列 -->
    <div class="run-toolbar">
      <label v-if="hasStdin" class="stdin-label">
        <input type="checkbox" v-model="showStdin" />
        <span>自訂輸入 (stdin)</span>
      </label>
      <span v-else />

      <div class="toolbar-actions">
        <!-- 切換編輯 / 檢視 -->
        <button @click="toggleEdit" class="edit-btn" :title="editMode ? '回到原始程式碼顯示' : '編輯程式碼'">
          <!-- 鉛筆 icon（檢視模式） -->
          <svg v-if="!editMode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
          <!-- 眼睛 icon（編輯模式） -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
          </svg>
          <span>{{ editMode ? '檢視原始' : '編輯' }}</span>
        </button>

        <!-- 重置（只在編輯模式顯示） -->
        <button v-if="editMode" @click="resetCode" class="reset-btn" title="重置回原始程式碼">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
            <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
          </svg>
          <span>重置</span>
        </button>

        <!-- 執行 -->
        <button @click="run" :disabled="loading" class="run-btn" :title="loading ? '編譯中...' : '執行程式'">
          <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" class="spin">
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
          </svg>
          <span>{{ loading ? '編譯中...' : '執行' }}</span>
        </button>
      </div>
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
import { ref, onMounted } from 'vue'

const props = defineProps({
  hasStdin: { type: Boolean, default: false },
  wrap:     { type: Boolean, default: false },
})

const codeWrapper  = ref(null)
const loading      = ref(false)
const output       = ref(null)
const isError      = ref(false)
const stdinText    = ref('')
const showStdin    = ref(false)
const editMode     = ref(false)
const originalCode = ref('')
const editCode     = ref('')

const getSlotCode = () => codeWrapper.value?.querySelector('code')?.textContent ?? ''

onMounted(() => {
  originalCode.value = getSlotCode()
  editCode.value = originalCode.value
})

const toggleEdit = () => {
  if (!editMode.value) {
    // 進入編輯模式：同步最新 slot 文字（以防 slot 更新）
    editCode.value = getSlotCode() || originalCode.value
    originalCode.value = editCode.value
  }
  editMode.value = !editMode.value
  output.value = null
}

const resetCode = () => {
  editCode.value = originalCode.value
}

const run = async () => {
  const raw = editMode.value ? editCode.value : getSlotCode()
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
.cpp-runner {
  margin: 16px 0;
}

.code-wrapper :deep(div[class*='language-']) {
  margin: 0;
}

/* ── 編輯區 ── */
.edit-area {
  background: #1e1e1e;
  border: 1px solid var(--vp-c-divider);
  border-bottom: none;
}
.edit-textarea {
  display: block;
  width: 100%;
  padding: 16px 20px;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: 1.6;
  color: #d4d4d4;
  background: transparent;
  border: none;
  outline: none;
  resize: vertical;
  box-sizing: border-box;
  tab-size: 4;
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

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ── 共用按鈕基底 ── */
.run-btn,
.edit-btn,
.reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
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

.edit-btn:hover {
  color: #8ab4f8;
  border-color: #8ab4f8;
  background: var(--vp-c-bg-soft);
}

.reset-btn:hover {
  color: #f6ad55;
  border-color: #f6ad55;
  background: var(--vp-c-bg-soft);
}

/* 轉圈動畫 */
.spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── stdin ── */
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
