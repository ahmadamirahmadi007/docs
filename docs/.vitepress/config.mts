import { defineConfig } from 'vitepress'

export default defineConfig({
  // shared properties and other top-level stuff...
  title: "My Awesome Project",
  description: "A VitePress Site",
  // dir : '/',
  // outDir : './dist',
  // cacheDir : './',
  // assetsDir : '../../assets',
  // srcDir : './docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  locales: {
    root: {
      label: 'فارسی',
      lang: 'fa',
      link: '/fa',
      dir: 'rtl',
      head: [],
      themeConfig: {
        siteTitle: 'مستندات ابر ویراک',
        nav: [],
        sidebar: [],
        footer: {},
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      dir: 'ltr',
      link: '/en',
      head: [], themeConfig: {
        siteTitle: 'Virak Cloud Documents',
        nav: [],
        sidebar: [],
        footer: {},
      }
    }
  }
})
