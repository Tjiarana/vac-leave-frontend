<script setup lang="ts">
const employeeId = ref<string | null>(null)
const password = ref<string | null>(null)

interface ResponseDTO<T> {
  status: string
  message: string
  data: T | null
  errors: T | null
}

const login = async (): Promise<void> => {
  if (employeeId.value && password.value) {
    const res = await $fetch<ResponseDTO<any>>('http://localhost:8080/auth/login', {
      method: 'POST',
      body: { employeeId: employeeId.value, password: password.value },
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
</script>

<template>
  <VContainer fluid class="fill-height pa-0">
    <v-row no-gutters align="center" justify="center" class="h-screen">
      <v-col cols="10" sm="7" md="5" lg="4" xl="3" class="bg-white">
        <v-card rounded="xl" class="pa-2" elevation="3">
          <v-card-title class="text-grey-darken-3 text-center mb-4 font-weight-regular">ลงชื่อเข้าใช้</v-card-title>
          <v-card-text class="ga-3">
            <v-text-field clearable v-model="employeeId" label="รหัสพนักงาน" class="font-weight-light"></v-text-field>
            <v-text-field clearable type="password" v-model="password" label="รหัสผ่าน"
              class="font-weight-light"></v-text-field>
            <v-btn @click="login" block text="เข้าสู่ระบบ" variant="flat" size="large" color="primary" rounded="lg" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </VContainer>
</template>

<style scoped></style>