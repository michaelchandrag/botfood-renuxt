import axios from 'axios'
import Cookie from 'cookie-universal'
const cookies = Cookie()

const axiosSsr = axios.create({
  baseURL: process.env.API_URL || "http://api.botfood.id/api/v1",
  headers: {'Authorization': "Bearer "+cookies.get('_tk')},
  timeout: 10000
});

export default axiosSsr
