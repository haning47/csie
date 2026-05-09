<script setup>
import { ref } from 'vue'

const props = defineProps({ password: String })
const input = ref('')
const unlocked = ref(false)
const wrong = ref(false)

const check = () => {
  if (input.value === props.password) {
    unlocked.value = true
    wrong.value = false
  } else {
    wrong.value = true
  }
}
</script>

<template>
  <div v-if="!unlocked" style="text-align:center; padding: 60px 20px;">
    <p>此頁面需要密碼才能瀏覽</p>
    <input
      v-model="input"
      type="password"
      placeholder="請輸入密碼"
      @keyup.enter="check"
      style="padding:8px; margin-right:8px;"
    />
    <button @click="check" style="padding:8px 16px;">確認</button>
    <p v-if="wrong" style="color:red; margin-top:8px;">密碼錯誤，請再試一次</p>
  </div>
  <slot v-else />
</template>