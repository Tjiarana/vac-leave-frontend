<script lang="ts" setup>
import type { PropType } from 'vue'

const employeeId = ref<string | null>(null)
const password = ref<string | null>(null)

const props = defineProps({
  loginErrCode: {
    type: String as PropType<string | null>,
    default: null
  }
})

const emit: any = defineEmits(['login', 'clearLoginErrCode'])

const rules = {
  employeeId: (value: string) => !!value || 'กรุณากรอกรหัสพนักงาน',
  password: (value: string) => !!value || 'กรุณากรอกรหัสผ่าน'
}

const login = (): void => {
  if (employeeId.value && password.value) {
    emit('login', employeeId.value, password.value)
  }
}

const getErrMsg = computed(() => {
  if (props.loginErrCode == null) {
    return null
  } else if (props.loginErrCode == "EMP_NOT_FOUND") {
    employeeId.value = null
    password.value = null
    return 'ไม่พบผู้ใช้งาน'
  } else if (props.loginErrCode == "EMP_INVALID_PASS") {
    password.value = null
    return 'รหัสผ่านไม่ถูกต้อง'
  }
})

const clearLoginErrCode = (): void => {
  emit('clearLoginErrCode')
}

</script>

<template>
  <v-col cols="10" sm="7" md="5" lg="4" xl="3">
    <v-card rounded="xl" class="pa-2" elevation="3">
      <v-card-title class="text-main-text text-center mb-4 font-weight-regular">เข้าสู่ระบบ</v-card-title>
      <v-card-text>
        <v-text-field @update:focused="clearLoginErrCode" :error="props.loginErrCode == 'EMP_NOT_FOUND'" :rules="[rules.employeeId]"
          v-model="employeeId" label="รหัสพนักงาน" class="font-weight-light mb-3" />
        <v-text-field @update:focused="clearLoginErrCode" :error="!!props.loginErrCode"
          :error-messages="getErrMsg" :rules="[rules.password]" clearable type="password" v-model="password"
          label="รหัสผ่าน" class="font-weight-light mb-3" />
        <v-btn @click="login" block text="ล็อกอิน" variant="flat" size="large" color="primary" rounded="lg"
          class="text-white" />
      </v-card-text>
    </v-card>
  </v-col>
</template>


<style></style>