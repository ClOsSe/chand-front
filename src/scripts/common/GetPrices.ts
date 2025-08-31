import { fetchData } from '../axios/APIServices'
import { handleError } from '../errors/Handler'

export const getLatestPrice = async () => {
  try {
    const url = '/latest'
    const response = await fetchData(url)
    return response
  } catch (error) {
    console.error('Error fetching getLatestPrice:', error)
    handleError(error)
    throw error // هنوز می‌خوای بالا بره
  }
}
