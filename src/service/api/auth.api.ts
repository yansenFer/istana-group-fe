import type { IAuth } from '@/types'
import { handleApiError } from '../apiError'
import { axiosInstance } from '../axiosInstance'
import { AUTH_ENDPOINT } from '../endpoints'

export const loginApi = async (data: IAuth) => {
  try {
    return await axiosInstance.post(AUTH_ENDPOINT, data)
  } catch (err: unknown) {
    handleApiError(err)
  }
}
