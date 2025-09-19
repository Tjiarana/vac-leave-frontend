<script lang="ts" setup>
import type { PropType } from 'vue';
import { useDisplay } from 'vuetify';

const { xs, sm, smAndDown, md, lg, lgAndDown, xl, xxl, width, name } = useDisplay()

const props = defineProps({
  tableHeaders: {
    type: Array as PropType<any>,
    require: true
  },
  employees: {
    type: Array,
    require: true
  }
})

const tableHeight = computed(() => {
  if (smAndDown.value) return 350
  if (md.value) return 300
  if (lg.value) return 250
  if (xl.value) return 450
  if (xxl.value) return 350
})

</script>

<template>
  <v-data-table :height="tableHeight" :headers="props.tableHeaders" :items="props.employees" item-value="id"
    fixed-header :density="lgAndDown ? 'comfortable' : 'default'" :hover="true" hide-default-footer
    class="border rounded overflow-hidden">
    <template v-slot:top>
      <v-toolbar flat color="surface border-b">
        <v-toolbar-title class="text-secondary font-weight-bold" text="รายชื่อพนักงาน" />
        <v-btn variant="flat" color="primary" class="me-3 text-white" prepend-icon="mdi-account-plus" rounded="lg"
          text="เพิ่มพนักงาน" :ripple="false" @click="" />
      </v-toolbar>
    </template>
    <template #item.actions="{ item }">
      <div class="d-flex justify-center align-center ga-2">
        <v-tooltip text="รายละเอียด">
          <template #activator="{ props }">
            <v-btn v-bind="props" size="small" variant="text" :density="lgAndDown ? 'comfortable' : 'default'" icon>
              <v-icon>mdi-eye-outline</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="แก้ไข">
          <template #activator="{ props }">
            <v-btn v-bind="props" size="small" variant="text" :density="lgAndDown ? 'comfortable' : 'default'" icon>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="ลบ">
          <template #activator="{ props }">
            <v-btn v-bind="props" size="small" variant="text" :density="lgAndDown ? 'comfortable' : 'default'" icon>
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </template>
  </v-data-table>
</template>

<style scoped></style>