import { defineConfig } from 'vitepress'

export default defineConfig({
  // shared properties and other top-level stuff...
  lang: 'fa-IR',
  title: "Virak Cloud",
  // description: "",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  // dir : '/',
  // outDir : './dist',
  // cacheDir : './',
  // assetsDir : '../../assets',
  // srcDir : './docs',
  // vue: {
  // },
  // vite: {
  // },
  // markdown: {
  // https://github.com/markdown-it/markdown-it
  // },
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: { // make this `root` if you want to translate the default locale
            translations: {
              button: {
                buttonText: 'جستجو',
                buttonAriaLabel: 'جستجو'
              },
              modal: {
                displayDetails: 'نمایش جزئیات',
                resetButtonTitle: 'پاک کردن متن جستجو',
                backButtonTitle: 'بازگشت',
                noResultsText: 'نتیجه ای برای جسنجوی شما پیدا نشد :(',
                footer: {
                  selectText: 'انتخاب کنید',
                  navigateText: 'پیمایش کنید',
                  closeText: 'بستن',
                }
              }
            }
          }
        }
      }
    }
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],

    // socialLinks: [
    //   { icon: 'linkedin', link: 'https://liknedin.com/virakcloud' }
    // ]
  },
  locales: {
    root: {
      label: 'فارسی',
      lang: 'fa',
      link: '/fa',
      dir: 'rtl',
      title: 'ابر ویراک',
      // head: [],
      themeConfig: {
        siteTitle: 'مستندات ابر ویراک',

        // https://vitepress.dev/reference/site-config#lastupdated
        lastUpdated: {
          text: 'آخرین بروزرسانی'
        },
        // nav: [],
        sidebar: [{
          text: 'راهنمای استفاده',
          items: [
            { text: 'ثبت نام', link: '/fa/user/register' },
            { text: 'احراز هویت', link: '/fa/user/authentication' },

            { text: 'داشبورد', link: '/fa/dashboard' },
          ]
        }],
        footer: {},
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      dir: 'ltr',
      link: '/en',
      title: 'Virak Cloud',
      // head: [],
      themeConfig: {
        siteTitle: 'Virak Cloud Documents',
        // nav: [],
        sidebar: [],
        footer: {},
      }
    }
  }
})
