import type { IAuth } from '@/types'
import { handleApiError } from '../apiError'
import { axiosInstance } from '../axiosInstance'
import { USER_ENDPOINT } from '../endpoints'
import Cookies from 'universal-cookie'
import type { IUser, IUserForm } from '@/types/IUser'

const cookies = new Cookies(null, { path: '/' })
const token = cookies.get('auth')

export const createUser = async (data: IUserForm) => {
  try {
    return await axiosInstance.post(USER_ENDPOINT, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err: unknown) {
    handleApiError(err)
  }
}

export const getUser = async (id?: string) => {
  try {
    return await axiosInstance.get(`${USER_ENDPOINT}${id ? `/${id}` : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err: unknown) {
    handleApiError(err)
  }
}

export const editUser = async (id: string, data: IUserForm) => {
  try {
    return await axiosInstance.put(`${USER_ENDPOINT}${id ? `/${id}` : ''}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err: unknown) {
    handleApiError(err)
  }
}

export const deleteUser = async (id: string) => {
  try {
    return await axiosInstance.delete(`${USER_ENDPOINT}${id ? `/${id}` : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err: unknown) {
    handleApiError(err)
  }
}
