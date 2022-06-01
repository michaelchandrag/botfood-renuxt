module.exports = {
   content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
   theme: {
        extend: {
          keyframes: {
                'fade-in-down': {
                    '0%': {
                        opacity: '1',
                        transform: 'translateY(0px)'
                    },
                    '100%': {
                        opacity: '0',
                        transform: 'translateY(-10px)'
                    },
                }
            },
            animation: {
                'fade-in-down': 'fade-in-down 0.5s ease-in'
            },
          colors: {
            'green-food': '#029835'
          },
          borderRadius: {
            'fd': '16px',
            'fds': '8px'
          },
          fontSize: {
            'title': '19px',
            'summary-title': '33px',
            'summary-text': '15px',
            'text': '13px'

          },
          screens: {
            'xs' : '480px',
            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
          },
        },
        fontFamily: {
          'sans': ['Poppins', 'ui-sans-serif', 'system-ui']
        }

      },
  plugins: [],
}
