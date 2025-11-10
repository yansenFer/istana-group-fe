import { handleApiError } from '../apiError'
import { axiosInstance } from '../axiosInstance'
import Cookies from 'universal-cookie'
import { CART_ENDPOINT } from '../endpoints'
import type { ICartForm } from '@/types'

const cookies = new Cookies(null, { path: '/' })
const token = cookies.get('auth')

export const createCart = async (data: ICartForm) => {
  try {
    return await axiosInstance.post(CART_ENDPOINT, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err: unknown) {
    handleApiError(err)
  }
}

export const getCartUser = async (id?: string) => {
  try {
    return await axiosInstance.get(`${CART_ENDPOINT}${id ? `/${id}` : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err: unknown) {
    handleApiError(err)
  }
}

export const editCart = async (id: string, data: ICartForm) => {
  try {
    return await axiosInstance.put(`${CART_ENDPOINT}${id ? `/${id}` : ''}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err: unknown) {
    handleApiError(err)
  }
}

export const deleteCart = async (id: string) => {
  try {
    return await axiosInstance.delete(`${CART_ENDPOINT}${id ? `/${id}` : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err: unknown) {
    handleApiError(err)
  }
}
