// ~/plugin/api.js
export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })

  // Set baseURL to something different
  api.setBaseURL(process.env.goBaseUrl)

  // Inject to context as $api
  inject('api', api)
}