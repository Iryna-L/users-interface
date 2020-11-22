import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 30000,
  headers: {
    'Accept-Language': 'ru'
  },
  withCredentials: true
})

export default instance
