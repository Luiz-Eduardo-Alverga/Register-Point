import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://servicesapis.com/',
})
