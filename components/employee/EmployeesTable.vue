<script lang="ts" setup>
import type { PropType } from 'vue';
import { useDisplay } from 'vuetify';

const { xs, sm, smAndDown, md, lg, lgAndDown, xl, xxl, width, name } = useDisplay()

interface EmployeeDTO {
  id: string,
  employeeName: string,
  reportTo: EmployeeDTO | null,
  position: string
}

const props = defineProps({
  tableHeaders: {
    type: Array as PropType<any>,
    required: true
  },
  employees: {
    type: Array<EmployeeDTO>,
    required: true,
    default: []
  }
})

const emit = defineEmits(['refetchAllEmployee'])

const isModalOpen = ref<boolean>(false)
const modalAction = ref<string>('view')
const modalEmployeeId = ref<string | null>(null)

const isDeleteModalOpen = ref<boolean>(false)

const openModal = (action: string, employeeId: string | null): void => {
  modalAction.value = action
  if (employeeId) {
    modalEmployeeId.value = employeeId
  }
  isModalOpen.value = !isModalOpen.value
}

const openDeleteModal = (employeeId: string): void => {
  modalEmployeeId.value = employeeId
  isDeleteModalOpen.value = !isDeleteModalOpen.value
}
</script>

<template>
  <v-data-table height="100" :headers="props.tableHeaders" items-per-page="10"
    :items-per-page-options="[5, 10, 20]" :items="props.employees" item-value="id" fixed-header
    :hover="props.employees.length <= 0 ? false : true" :hide-default-footer="props.employees.length <= 0"
    class="border rounded overflow-hidden">
    <template v-slot:top>
      <v-toolbar flat color="surface border-b">
        <v-toolbar-title class="text-secondary font-weight-bold" text="รายชื่อพนักงาน" />
        <v-btn @click="openModal('add', null)" variant="flat" color="primary" class="me-3 text-white"
          prepend-icon="mdi-account-plus" rounded="lg" text="เพิ่มพนักงาน" :ripple="false" />
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <div class="text-center h-100 w-100 pa-4">
        ไม่มีข้อมูลพนักงาน
      </div>
    </template>
    <template #item.actions="{ item }">
      <div class="d-flex justify-center align-center ga-2">
        <v-tooltip text="รายละเอียด">
          <template #activator="{ props }">
            <v-btn @click="openModal('view', item.id)" v-bind="props" size="small" variant="text"
              :density="lgAndDown ? 'comfortable' : 'default'" icon>
              <v-icon>mdi-eye-outline</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="แก้ไข">
          <template #activator="{ props }">
            <v-btn @click="openModal('edit', item.id)" v-bind="props" size="small" variant="text"
              :density="lgAndDown ? 'comfortable' : 'default'" icon>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="ลบ">
          <template #activator="{ props }">
            <v-btn @click="openDeleteModal(item.id)" v-bind="props" size="small" variant="text"
              :density="lgAndDown ? 'comfortable' : 'default'" icon>
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </template>
  </v-data-table>

  <employee-modal @refetch-all-employee="emit('refetchAllEmployee')" @close-modal="isModalOpen = !isModalOpen"
    :is-modal-open="isModalOpen" :modal-action="modalAction" :employee-id="modalEmployeeId" />
  <delete-modal @refetch-all-employee="emit('refetchAllEmployee')" @close-modal="isDeleteModalOpen = !isDeleteModalOpen" :is-modal-open="isDeleteModalOpen"
    :modal-action="'deleteEmployee'" :target-id="modalEmployeeId" />
</template>

<style scoped></style>