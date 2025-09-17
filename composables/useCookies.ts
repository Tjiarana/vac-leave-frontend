export const useCookies = () => {
  const setCookie = (key: string, value: any): void => {
    const cookie = useCookie<any>(key)
    cookie.value = value
  }

  const clearCookie = (key: string): void => {
    const cookie = useCookie<any>(key)
    cookie.value = null
  }

  return { setCookie, clearCookie }
}
