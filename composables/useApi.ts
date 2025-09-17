export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.url
  const token = useCookie<string | null>('token')

  async function request<T>(path: string, opts: any = {}): Promise<T> {
    try {
      return await $fetch<T>(path, {
        baseURL,
        headers: {
          Accept: 'application/json',
          ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
          ...opts.headers,
        },
        ...opts,
      })
    } catch (err: any) {
      const status = err?.response?.status
      if (status === 401 || status === 403) {
        await navigateTo('/')
      }
      throw err
    }
  }

  const getAllEmployeeDTO = () => request<any>('/employee/dto', { method: 'GET', cache: 'no-cache' })

  return { getAllEmployeeDTO }
}
