import { Configuration } from '@nuxt/types'

const isDev = process.env.NODE_ENV !== 'production'

const config: Configuration = {
  modern: !isDev,
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Personal site of CoolONEOfficial',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.jpg' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['./assets/scss/buefy.scss'],
  styleResources: {
    scss: []
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-fire',
    'nuxt-i18n'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    publicPath: '/assets/',
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend(/* config, ctx */) {}
  },
  manifest: {
    name: 'Personal site of CoolONEOfficial',
    lang: 'en-US'
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  buefy: {
    css: false,
    materialDesignIcons: false
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    vueI18n: { fallbackLocale: 'en' },
    vueI18nLoader: true
  },
  fire: {
    config: {
      apiKey: 'AIzaSyBDVOdqcspdnve9eiRpR91mV6VSFZPMNFI',
      authDomain: 'personal-site-d9a58.firebaseapp.com',
      databaseURL: 'https://personal-site-d9a58.firebaseio.com',
      projectId: 'personal-site-d9a58',
      storageBucket: 'personal-site-d9a58.appspot.com',
      messagingSenderId: '296312063282',
      appId: '1:296312063282:web:d0da9be983c7eb90c7432b',
      measurementId: 'G-9H4D1GY1VP'
    },
    services: {
      auth: true,
      firestore: true,
      functions: true,
      storage: true,
      performance: true,
      analytics: true
    }
  }
}

export default config