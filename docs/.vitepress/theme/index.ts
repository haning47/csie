import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { h } from 'vue'
import PasswordGate from './PasswordGate.vue'
import CppRunner from './CppRunner.vue'
import Breadcrumb from './Breadcrumb.vue'
import type { Theme } from 'vitepress'

const theme: Theme = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(Breadcrumb)
    })
  },
  enhanceApp({ app }) {
    app.component('PasswordGate', PasswordGate)
    app.component('CppRunner', CppRunner)
  }
}

export default theme