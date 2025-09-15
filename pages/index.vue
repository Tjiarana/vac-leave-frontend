<script setup lang="ts">
interface ResponseDTO<T> {
  status: string
  message: string
  data: T
  errors: T
}

const { setCookie } = useCookies()

const loginErrCode = ref<string | null>(null)

const login = async (employeeId: string, password: string): Promise<void> => {
  try {
    const config = useRuntimeConfig()
    const AUTH_API_URL = config.public.authurl
    const res = await $fetch.raw<ResponseDTO<any>>(`${AUTH_API_URL}/login`, {
      method: 'POST',
      body: { employeeId: employeeId, password: password },
      headers: { 'Content-Type': 'application/json' },
    })
    setCookie('token', res._data?.data.token)
    setCookie('token_expiration', res._data?.data.token_expiration)
    navigateTo('/leave', {replace: true})
  } catch (err: any) {
    loginErrCode.value = err.response._data.code
    console.log(err);
  }
}

const clearLoginErrCode = (): void => {
  loginErrCode.value = null
}
</script>

<template>
  <VContainer fluid class="fill-height pa-0">
    <v-row no-gutters align="center" justify="center" class="h-screen">
      <LoginCard @login="login" @clearLoginErrCode="clearLoginErrCode" :login-err-code="loginErrCode"/>
    </v-row>
  </VContainer>
</template>

<style scoped></style>