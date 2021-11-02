import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000/api'
})

api.defaults.withCredentials = true

export default api
