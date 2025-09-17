<script lang="ts" setup>
import type { PropType } from 'vue';

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

</script>

<template>
  <v-data-table :headers="props.tableHeaders" :items="props.employees" height="449" item-value="name" fixed-header
    class="border rounded overflow-hidden employee-list-table">
    <template #item.actions="{ item }">
      <div class="d-flex justify-center ga-3">
        <v-tooltip text="แก้ไข">
          <template #activator="{ props }">
            <v-btn v-bind="props" size="small" variant="text" icon>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="ลบ">
          <template #activator="{ props }">
            <v-btn v-bind="props" size="small" variant="text" icon>
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </template>
  </v-data-table>
</template>

<style scoped>
</style>