const { getCookie } = useCookies()

export default defineNuxtRouteMiddleware((to, from) => {
    const token = getCookie("token")

    if(!token) {
        return navigateTo("/")
    }
})
