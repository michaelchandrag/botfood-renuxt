const middleware = {}

middleware['auth-ssr'] = require('..\\middleware\\auth-ssr.js')
middleware['auth-ssr'] = middleware['auth-ssr'].default || middleware['auth-ssr']

export default middleware
