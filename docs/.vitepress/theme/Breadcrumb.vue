<template>
  <nav v-if="crumbs.length" class="vp-breadcrumb">
    <span v-for="(item, i) in crumbs" :key="i" class="crumb">
      <span v-if="i > 0" class="sep">›</span>
      <a v-if="item.link && i < crumbs.length - 1" :href="withBase(item.link)">{{ item.text }}</a>
      <span v-else class="current">{{ item.text }}</span>
    </span>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

const { theme } = useData()
const route    = useRoute()

/** 遞迴搜尋 sidebar，回傳從根到目前頁面的麵包屑陣列 */
function findCrumbs(items, target, ancestors = []) {
  for (const item of items) {
    const current = [...ancestors, { text: item.text, link: item.link }]

    // 完全相符的連結
    if (item.link && (target === item.link || target === item.link + '.html')) {
      return current
    }

    // 遞迴搜尋子項目
    if (item.items?.length) {
      const found = findCrumbs(item.items, target, current)
      if (found) return found
    }
  }
  return null
}

const crumbs = computed(() => {
  
  const sidebar = theme.value.sidebar
  if (!sidebar) return []

  const target = route.path

  // sidebar 可能是 object（依路徑分組）或 array
  const groups = Array.isArray(sidebar)
    ? [sidebar]
    : Object.values(sidebar)

  for (const group of groups) {
    const result = findCrumbs(group, target)
    if (result) return result
  }
  return []
})
</script>

<style scoped>
.vp-breadcrumb {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 14px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
}
.sep {
  margin: 0 4px;
  color: var(--vp-c-text-3);
  font-size: 12px;
}
.vp-breadcrumb a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}
.vp-breadcrumb a:hover {
  color: var(--vp-c-brand-1);
}
.current {
  color: var(--vp-c-text-1);
  font-weight: 500;
}
</style>
