<script setup lang="ts">
const employeeId = ref<string | null>(null)
const password = ref<string | null>(null)

const login = (): void => {
  if(employeeId.value && password.value){ 
    console.log(employeeId.value, password.value)
  }
}
</script>

<template>
  <VContainer fluid class="fill-height pa-0">
    <VRow no-gutters class="h-auto align-center justify-center">
      <VCol cols="10" sm="7" md="5" lg="4" xl="3"
        class="align-center fill-height bg-white rounded-xl pa-4 elevation-6">
        <VRow no-gutters class="justify-center">
          <v-col cols="12" class="d-flex flex-column pa-sm-2 ga-3">
            <h2 class="text-grey-darken-3 text-center mb-4 font-weight-regular">ลงชื่อเข้าใช้</h2>
            <v-text-field clearable v-model ="employeeId" label="รหัสพนักงาน" class="font-weight-light"></v-text-field>
            <v-text-field clearable type="password" v-model="password" label="รหัสผ่าน" class="font-weight-light"></v-text-field>
            <v-btn @click="login" block text="เข้าสู่ระบบ" variant="flat" size="large" color="primary" rounded="lg" class="login-btn" />
          </v-col>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
</style>