// lib/axiosInstance.js
import Config from '@/config/AppConfig'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: Config.baseURL,
  // headers: {
  //   'Content-Type': 'application/json',
  //   Authorization: localStorage.getItem('token'),
  // },
})
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const fetchData = async (url: string) => {
  try {
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching landing data:', error)
    throw error
  }
}

export const submitData = async (url: string, data: unknown) => {
  try {
    const response = await axiosInstance.post(url, data)
    return response.data
  } catch (error) {
    console.error('Error submitting landing data:', error)
    throw error
  }
}
