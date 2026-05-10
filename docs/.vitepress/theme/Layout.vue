<template>
  <DefaultLayout>
    <template #doc-before>
      <Breadcrumb />
    </template>
  </DefaultLayout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import Breadcrumb from './Breadcrumb.vue'
const DefaultLayout = DefaultTheme.Layout
</script>
