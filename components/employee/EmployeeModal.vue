<script lang="ts" setup>
import type { PropType } from 'vue'
import { useApi } from '@/composables/useApi'

interface userRequestModel {
  employeeId: string
  employeeFirstname: string
  employeeLastname: string
  employeeGender: string
  employeeEmail: string
  employeePhone: string
  reportTo: string | null
  positionId: string | null
  userPassword: string
  roles: Array<string>
}

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true,
    default: false
  },
  modalAction: {
    type: String,
    required: true
  },
  employeeId: {
    type: String as PropType<string | null>,
    required: false,
    default: null
  }
})

const emit = defineEmits(['closeModal', 'refetchAllEmployee'])

const genderOptions = [
  { name: 'ชาย', value: 'M' },
  { name: 'หญิง', value: 'F' }
]

const roleOptions = [
  { name: 'พนักงาน', value: 'EMPLOYEE' },
  { name: 'ผู้จัดการ', value: 'MANAGER' },
  { name: 'แอดมิน', value: 'ADMIN' },
]

const { data: positions } = await useApi().getAllPosition()
const positionOptions: any[] = []

for (const position of positions) {
  positionOptions.push({ name: position.positionName, value: position.positionId})
}

const { data: managers } = await useApi().getAllManager()
const managersOptions: any[] = []

for (const manager of managers) {
  managersOptions.push({ name: manager.managerName, value: manager.managerId})
}
managersOptions.push({ name: 'ไม่มี', value: null })

const userForm = ref<userRequestModel>({
  employeeId: '',
  employeeFirstname: '',
  employeeLastname: '',
  employeeGender: 'M',
  employeeEmail: '',
  employeePhone: '',
  reportTo: null,
  positionId: positionOptions[0].value,
  userPassword: '',
  roles: ['EMPLOYEE']
})

const isModalOpen = ref<boolean>(props.isModalOpen)

const resetForm = () => {
  userForm.value = {
    employeeId: '',
    employeeFirstname: '',
    employeeLastname: '',
    employeeGender: 'M',
    employeeEmail: '',
    employeePhone: '',
    reportTo: null,
    positionId: positionOptions[0].value,
    userPassword: '',
    roles: ['EMPLOYEE']
  }
}

const getEmployeeData = async (): Promise<void> => {
  if ((props.modalAction === 'view' || props.modalAction === 'edit') && props.employeeId) {
    const { data: employeeData } = await useApi().getEmployeeById(props.employeeId)

    userForm.value.employeeId = employeeData.id
    userForm.value.employeeFirstname = employeeData.employeeFirstname
    userForm.value.employeeLastname = employeeData.employeeLastname
    userForm.value.employeeGender = employeeData.employeeGender
    userForm.value.employeeEmail = employeeData.employeeEmail
    userForm.value.employeePhone = employeeData.employeePhone
    userForm.value.reportTo = employeeData.reportTo
    userForm.value.positionId = employeeData.positionId

    const { data: userRolesData } = await useApi().getUserRolesByEmployeeId(props.employeeId);
    userForm.value.roles = userRolesData
  }
}

watch(() => props.isModalOpen, (newVal) => {
  isModalOpen.value = newVal
})

const submitForm = () => {
  useApi().insertUser(userForm.value);
  if (true) {
    onDialogModelUpdate(false)
    emit('refetchAllEmployee')
  }
}

const onDialogModelUpdate = (val: boolean) => {
  isModalOpen.value = val
  if (!val) {
    emit('closeModal')
    resetForm()
  }
}

watch(isModalOpen, (open) => {
  if (open) {
    getEmployeeData()
  }
})
</script>

<template>
  <v-dialog v-model="isModalOpen" @update:model-value="onDialogModelUpdate" max-width="500" max-height="630" scrollable>
    <v-card :subtitle="props.modalAction == 'add'?'กรอกข้อมูลพนักงานใหม่':props.modalAction == 'edit'?`แก้ไขข้อมูลพนักงานรหัส : ${props.employeeId}`:`รายละเอียดพนักงานรหัส : ${props.employeeId}`"
      :title="`${props.modalAction == 'add' ? 'เพิ่ม' : props.modalAction == 'edit' ? 'แก้ไข' : 'ข้อมูล'}พนักงาน`">
      <template #text>
        <v-row class="text-sub-text pt-4">
          <v-col v-if="props.modalAction == 'add'" cols="12">
            <v-text-field base-color="sub-text" v-model="userForm.employeeId" label="รหัสพนักงาน"/>
          </v-col>

          <v-col cols="12">
            <v-text-field base-color="sub-text" v-model="userForm.employeeFirstname" label="ชื่อ" :readonly="props.modalAction == 'view'?true:false"/>
          </v-col>

          <v-col cols="12">
            <v-text-field base-color="sub-text" v-model="userForm.employeeLastname" label="นามสกุล" :readonly="props.modalAction == 'view'?true:false"/>
          </v-col>

          <v-col cols="12">
            <v-text-field base-color="sub-text" v-model="userForm.employeePhone" label="เบอร์โทรศัพท์" :readonly="props.modalAction == 'view'?true:false"/>
          </v-col>

          <v-col cols="12">
            <v-text-field base-color="sub-text" v-model="userForm.employeeEmail" label="อีเมล" type="email" :readonly="props.modalAction == 'view'?true:false"/>
          </v-col>

          <v-col cols="12" md="4">
            <v-select v-model="userForm.employeeGender" :items="genderOptions" item-title="name" item-value="value" :readonly="props.modalAction == 'view'?true:false"
              variant="outlined" label="เพศ" base-color="sub-text" />
          </v-col>

          <v-col cols="12" md="8">
            <v-select v-model="userForm.roles" :items="roleOptions" item-title="name" item-value="value" variant="outlined"
              multiple label="บทบาท" base-color="sub-text" :readonly="props.modalAction == 'view'?true:false"/>
          </v-col>

          <v-col cols="12">
            <v-select v-model="userForm.positionId" :items="positionOptions" item-title="name" item-value="value" variant="outlined"
              label="ตำแหน่ง" base-color="sub-text" :readonly="props.modalAction == 'view'?true:false"/>
          </v-col>

          <v-col cols="12">
            <v-select v-model="userForm.reportTo" :items="managersOptions" item-title="name" item-value="value" variant="outlined"
              label="ผู้จัดการ" base-color="sub-text" :readonly="props.modalAction == 'view'?true:false"/>
          </v-col>
        </v-row>
      </template>

      <v-divider />

      <v-card-actions class="bg-surface-light">
        <v-btn @click="submitForm" text="ยืนยัน" />
        <v-btn @click="onDialogModelUpdate(false)" text="ยกเลิก" variant="plain" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style></style>
