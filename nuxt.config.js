export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Botfood',
    htmlAttrs: {
      lang: 'id'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css2?family=Poppins'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://unpkg.com/animate.css@3.5.2/animate.min.css'
      }

    ],
    script: [{
      src: 'https://kit.fontawesome.com/1f26bc1e2a.js',
      type: 'text/javascript'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/global.css',
    '@/assets/css/app.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{
      src: '~/plugins/vue-datepicker',
      ssr: false
    },
    {
      src: '~/plugins/formatter'
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
    '@nuxtjs/device',
    '@nuxtjs/pwa',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'cookie-universal-nuxt',
    '@nuxtjs/toast'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
    // proxy: true
  },
  // proxy: {
  //   '/api/': { target: 'http://api.botfood.xyz/api/v1/', pathRewrite: {'^/api/': ''}, changeOrigin: true }
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
      postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: '3000' // default: localhost
  },

  moment: {
    locales: ['id']
  },

  // tailwindcss: {
  //   config: {
  //     theme: {
  //       extend: {
  //         colors: {
  //           'green-food': '#029835'
  //         },
  //         borderRadius: {
  //           'fd': '16px',
  //           'fds': '8px'
  //         },
  //         fontSize: {
  //           'title': '19px',
  //           'summary-title': '33px',
  //           'summary-text': '15px',
  //           'text': '13px'

  //         },
  //         screens: {
  //           'xs' : '480px',
  //           'lg': '1024px',
  //           // => @media (min-width: 1024px) { ... }

  //           'xl': '1280px',
  //           // => @media (min-width: 1280px) { ... }
  //         },
  //       },
  //       fontFamily: {
  //         'sans': ['Poppins', 'ui-sans-serif', 'system-ui']
  //       }

  //     },

  //   }

  // }

}
