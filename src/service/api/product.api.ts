import { handleApiError } from '../apiError'
import { axiosInstance } from '../axiosInstance'
import Cookies from 'universal-cookie'
import { PRODUCT_ENDPOINT } from '../endpoints'
import type { IProductForm } from '@/types/IProduct'

const cookies = new Cookies(null, { path: '/' })
const token = cookies.get('auth')

export const createProduct = async (data: IProductForm) => {
  try {
    return await axiosInstance.post(PRODUCT_ENDPOINT, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err: unknown) {
    handleApiError(err)
  }
}

export const getProduct = async (id?: string) => {
  try {
    return await axiosInstance.get(`${PRODUCT_ENDPOINT}${id ? `/${id}` : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err: unknown) {
    handleApiError(err)
  }
}

export const editProduct = async (id: string, data: IProductForm) => {
  try {
    return await axiosInstance.put(`${PRODUCT_ENDPOINT}${id ? `/${id}` : ''}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err: unknown) {
    handleApiError(err)
  }
}

export const deleteProduct = async (id: string) => {
  try {
    return await axiosInstance.delete(`${PRODUCT_ENDPOINT}${id ? `/${id}` : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err: unknown) {
    handleApiError(err)
  }
}
