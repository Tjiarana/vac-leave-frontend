<script setup lang="ts">
interface ResponseDTO<T> {
  status: string
  message: string
  data: T | null
  errors: T | null
}

const { setCookie } = useCookies()

const login = async (employeeId: string, password: string): Promise<void> => {
  try {
    const res = await $fetch.raw<ResponseDTO<any>>('http://localhost:8080/auth/login', {
      method: 'POST',
      body: { employeeId: employeeId, password: password },
      headers: { 'Content-Type': 'application/json' },
    })
    setCookie('token', res._data?.data.token)
    setCookie('token_expiration', res._data?.data.token_expiration)
  } catch (err: any) {
    console.log(err);
  }
}
</script>

<template>
  <VContainer fluid class="fill-height pa-0">
    <v-row no-gutters align="center" justify="center" class="h-screen">
      <LoginCard @login="login" />
    </v-row>
  </VContainer>
</template>

<style scoped></style>