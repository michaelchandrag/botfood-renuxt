export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Botfood',
    htmlAttrs: {
      lang: 'id'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Poppins' },
      
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    //baseURL: 'https://donasi.test/api/'
    baseURL: '/api',
    proxy: true
  },
  proxy: {
    '/api/': { target: 'http://api.botfood.xyz/api/v1/', pathRewrite: {'^/api/': ''}, changeOrigin: true }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    host: '0.0.0.0',
    port: '3000' // default: localhost
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'data.token',
          required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'data'
        },
        endpoints: {
          login: { 
            url: '/api/login_brand',
            method: 'post',
            propertyName: 'data.token'
          },
          // logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/me', method: 'get' }
        }
      }
    }
  },

  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            'green-food':'#029835'
          },
          borderRadius: {
            'fd': '16px'
          }
        },
        fontFamily: {
         'sans': ['Poppins','ui-sans-serif', 'system-ui']
        },
        
      },
      
    }

  }

}
