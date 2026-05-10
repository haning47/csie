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

const { theme, page } = useData()
const route = useRoute()

/** 標準化路徑：去掉 .html、base prefix、末尾斜線 */
function normPath(p) {
  if (!p) return ''
  return p
    .replace(/\.html$/, '')   // 去掉 .html
    .replace(/\/$/, '')        // 去掉末尾斜線
    .toLowerCase()
}

/** 遞迴搜尋，回傳麵包屑陣列或 null */
function findCrumbs(items, target, ancestors = []) {
  for (const item of items) {
    const crumb = { text: item.text, link: item.link }
    const path  = [...ancestors, crumb]

    if (item.link && normPath(item.link) === target) {
      return path
    }
    if (item.items?.length) {
      const found = findCrumbs(item.items, target, path)
      if (found) return found
    }
  }
  return null
}

const crumbs = computed(() => {
  const sidebar = theme.value.sidebar
  if (!sidebar) return []

  // 嘗試多種路徑格式
  const candidates = [
    normPath(route.path),
    normPath('/' + page.value.relativePath.replace(/\.md$/, '')),
  ]

  // sidebar 可能是 array 或 object（依路徑分組）
  const allItems = Array.isArray(sidebar)
    ? sidebar
    : Object.values(sidebar).flat()

  for (const target of candidates) {
    const result = findCrumbs(allItems, target)
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
.vp-breadcrumb a:hover { color: var(--vp-c-brand-1); }
.current { color: var(--vp-c-text-1); font-weight: 500; }
</style>
