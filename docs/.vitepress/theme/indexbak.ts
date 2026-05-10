import DefaultTheme from 'vitepress/theme'
import './custom.css'
import PasswordGate from './PasswordGate.vue'
import CppRunner from './CppRunner.vue'
import type { Theme } from 'vitepress'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PasswordGate', PasswordGate)
    app.component('CppRunner', CppRunner)
  }
}

export default theme