<script lang="ts" setup>
import EmployeesTable from '~/components/employee/EmployeesTable.vue'
import { useApi } from '@/composables/useApi'
import { useDisplay } from 'vuetify'

const { xs, sm, md, lg, lgAndDown, xl, xlAndUp, width, name } = useDisplay()

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

const fetchAllEmployee = async () => {
  const { data: employeesData } = await useApi().getAllEmployeeDTO()
  employees.value = employeesData
}

onMounted(async () => {
  fetchAllEmployee()
})

const headers = ref<any[]>([
  { title: 'รหัสพนักงาน', align: 'start' as const, key: 'id' },
  { title: 'ชื่อ', align: 'start' as const, key: 'employeeName' },
  { title: 'ตำแหน่ง', align: 'start' as const, key: 'position' },
  { title: 'ผู้จัดการ', align: 'center' as const, key: 'reportTo', value: (item: any) => item.reportTo?.employeeName ?? '-' },
  { title: 'การกระทำ', align: 'center' as const, key: 'actions', sortable: false }
])

</script>
<template>
  <VContainer fluid class="pa-0 bg-surface fill-height d-flex flex-column">
    <v-row no-gutters justify="center" align="center" class="w-100 px-16" :class="lgAndDown ? 'py-8' : 'py-16'">
      <v-col class="d-flex h-100">
        <EmployeesTable @refetch-all-employee="fetchAllEmployee" :table-headers="headers" :employees="employees" />
      </v-col>
    </v-row>
  </VContainer>
</template>


<style scoped></style>