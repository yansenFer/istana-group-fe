/* eslint-disable @typescript-eslint/no-explicit-any */
export function handleApiError(err: any): never {
  const response = err?.response
  const message =
    response?.data ||
    response?.data?.message ||
    response?.statusText ||
    'Something went wrong when communicating with the server.'

  console.error('API Error:', {
    status: response?.status,
    message,
    path: response?.config?.url,
  })

  throw new Error(message)
}
