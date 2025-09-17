<script lang="ts" setup>
import type { PropType } from 'vue';
import { useDisplay } from 'vuetify';

const { xs, sm, md, lg, lgAndDown, xl, width, name } = useDisplay()


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
  if (xs.value || sm.value) return 300
  if (md.value) return 400
  if (lg.value) return 235
  if (xl.value) return 300
})

</script>

<template>
  <v-data-table :height="tableHeight" :headers="props.tableHeaders" items-per-page="5" :items="props.employees" item-value="id" fixed-header :density="lgAndDown?'comfortable':'default'" :hover="true"
    class="border rounded overflow-hidden">
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