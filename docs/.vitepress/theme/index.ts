// https://vitepress.dev/guide/custom-theme
// import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import DarkModeImage from './components/DarkModeImages.vue'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout: Layout,
  // Layout: () => {
  //   return h(DefaultTheme.Layout, null, {
  //     // https://vitepress.dev/guide/extending-default-theme#layout-slots
  //   })
  // },
  enhanceApp({ app, router, siteData }) {
    app.component('DarkModeImage', DarkModeImage)
  }
} satisfies Theme
