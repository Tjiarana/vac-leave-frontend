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
      if (status === 401) {
        await navigateTo('/')
      }
      throw err
    }
  }

  const getAllEmployeeDTO = () => request<any>('/employee/dto', { method: 'GET', cache: 'no-cache' })

  const getEmployeeById = (id: string) => request<any>(`/employee/${id}`, { method: 'GET', cache: 'no-cache' })

  const getUserRolesByEmployeeId = (employeeId: string) => request<any>(`/user/${employeeId}/role`, { method: 'GET', cache: 'no-cache' })

  const getAllPosition = () => request<any>(`/position`, { method: 'GET', cache: 'no-cache' })

  const getAllManager = () => request<any>('/manager', { method: 'GET', cache: 'no-cache' })

  const getOtherManager = (exceptId: string) => request<any>(`/manager/other?exceptId=${exceptId}`, { method: 'GET', cache: 'no-cache' })

  const insertUser = (user: any) => request<any>('/user', { method: 'POST', body: user, cache: 'no-cache'})

  const editUser = (user: any) => request<any>('/user', { method: 'PUT', body: user, cache: 'no-cache'})

  const deleteUser = (employeeId: string | null) => request<any>(`/user/${employeeId}`, { method: 'DELETE', cache: 'no-cache' })

  return { getAllEmployeeDTO, getEmployeeById, getUserRolesByEmployeeId, getAllPosition, getAllManager, getOtherManager, insertUser, editUser, deleteUser }
}
