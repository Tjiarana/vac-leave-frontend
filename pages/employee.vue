<script lang="ts" setup>
import EmployeesTable from '~/components/employee/EmployeesTable.vue'
import { useApi } from '@/composables/useApi'
import { useDisplay } from 'vuetify'

const { xs, sm, md, lg, lgAndDown, xl, width, name } = useDisplay()

definePageMeta({
  layout: "main",
  middleware: "auth"
})

interface EmployeeDTO {
  id: string,
  employeeName: string,
  reportTo: EmployeeDTO | null,
  position: string
}

const employees = ref<EmployeeDTO[]>([])

onMounted(async () => {
  const { data: employeesData } = await useApi().getAllEmployeeDTO()
  employees.value = employeesData
})

const headers = ref<any[]>([
  { title: 'รหัสพนักงาน', align: 'start' as const, key: 'id' },
  { title: 'ชื่อ', align: 'start' as const, key: 'employeeName' },
  { title: 'ตำแหน่ง', align: 'start' as const, key: 'position' },
  { title: 'ผู้จัดการ', align: 'center' as const, key: 'reportTo', value: (item: any) => item.reportTo?.name ?? '-' },
  { title: 'การกระทำ', align: 'center' as const, key: 'actions', sortable: false }
])

</script>
<template>
  <VContainer fluid class="pa-0 bg-surface fill-height d-flex flex-column">
    <v-row no-gutters justify="center" align="center" class="bg-secondary w-100">
      <v-col class="d-flex justify-center">
        <h1 class="font-weight-bold text-white" :class="lgAndDown?'py-6 text-h5':'py-0'">จัดการพนักงาน</h1>
      </v-col>
    </v-row>
    <v-row no-gutters class="w-100 flex-grow-1 px-16" :class="lgAndDown?'py-8':'py-16'">
      <v-col class="d-flex flex-column ga-6">
        <h3 class="font-weight-regular text-secondary ps-4">รายชื่อพนักงาน</h3>
        <v-row no-gutters justify="center" align="center">
          <v-col class="d-flex flex-grow-1 fill-height">
            <EmployeesTable :table-headers="headers" :employees="employees"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </VContainer>
</template>


<style scoped>
</style>