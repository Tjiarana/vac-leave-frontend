<script lang="ts" setup>
import type { PropType } from 'vue'

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
  selectedDate: {
    type: String,
  },
  leaves: {
    type: Array as PropType<any>
  }
})

const emit = defineEmits(['closeModal'])

const isModalOpen = ref<boolean>(props.isModalOpen)

watch(() => props.isModalOpen, (newVal) => {
  isModalOpen.value = newVal
})

const onDialogModelUpdate = (val: boolean) => {
  isModalOpen.value = val
  if (!val) {
    emit('closeModal')
  }
}

watch(isModalOpen, async (open) => {
  if (open) {

  }
})

const startDate = computed(() => {
  const startDate = ref<Date>(new Date())
  startDate.value.setDate(startDateModel.value.getDate())
  startDate.value.setHours(startTimeModel.value ?? 0, 0, 0, 0)
  return startDate.value
})

const endDate = computed(() => {
  const endDate = ref<Date>(new Date())
  endDate.value.setDate(endDateModel.value.getDate())
  endDate.value.setHours(endTimeModel.value ?? 24, 0, 0, 0)
  return endDate.value
})

const startDateModel = ref<Date>(new Date())
const endDateModel = ref<Date>(new Date())
const startTimeModel = ref<number | null>(0)
const endTimeModel = ref<number | null>(24)
const timeModel = ref<string>('allday')

const totalDate = computed(() => {
  return (endDate.value.getTime() - startDate.value.getTime()) / 3600000 / 24
})

const isLeaveSameDate = computed(() => {
  return (startDateModel.value.toDateString() === endDateModel.value.toDateString())
})

const startTimeList: Array<any> = [
  { title: 'เต็มวัน', time: 0 },
  { title: 'ครึ่งวันบ่าย', time: 12 }
]

const endTimeList: Array<any> = [
  { title: 'เต็มวัน', time: 24 },
  { title: 'ครึ่งวันเช้า', time: 12 }
]

const timeList: Array<any> = [
  { title: 'เต็มวัน', value: 'allday', start: 0, end: 24 },
  { title: 'ครึ่งวันเช้า', value: 'firstHalf', start: 0, end: 12 },
  { title: 'ครึ่งวันบ่าย', value: 'secondHalf', start: 12, end: 24 }
]

const setTimeModel = () => {

}

const reserve = () => {
  console.log('start : ', startDate.value.toISOString());
  console.log('end : ', endDate.value.toISOString());
  console.log('total : ', totalDate.value);
}
</script>

<template>
  <v-dialog v-model="isModalOpen" @update:model-value="onDialogModelUpdate" max-width="500" max-height="400" scrollable>
    <v-card>
      <v-card-title>
        <span v-if="props.modalAction == 'reserve'">จองวันลา</span>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-row no-gutters justify="space-evenly" align="center">
          <v-col cols="5">
            <v-date-input v-model="startDateModel" variant="underlined" prepend-icon="" label="เริ่ม"
              base-color="primary" color="primary" />
            <v-select v-if="!isLeaveSameDate" v-model="startTimeModel" item-title="title" item-value="time"
              label="ช่วงเวลา" variant="underlined" :items="startTimeList" base-color="primary" color="primary" />
          </v-col>
          <v-col cols="2" class="d-flex align-center justify-center">
            <v-icon icon="mdi-arrow-right-thin" size="large" color="primary" />
          </v-col>
          <v-col cols="5">
            <v-date-input v-model="endDateModel" variant="underlined" prepend-icon="" label="สิ้นสุด"
              base-color="primary" color="primary" />
            <v-select v-if="!isLeaveSameDate" v-model="endTimeModel" item-title="title" item-value="time"
              label="ช่วงเวลา" variant="underlined" :items="endTimeList" base-color="primary" color="primary" />
          </v-col>
        </v-row>
        <v-row v-if="isLeaveSameDate" no-gutters justify="space-evenly" align="center">
          <v-col cols="12">
            <v-select v-model="timeModel" item-title="title" item-value="value" label="ช่วงเวลา" variant="underlined"
              :items="timeList" base-color="primary" color="primary">
              <template v-slot:item="{ props: itemProps, item }">
                <v-list-item v-bind="itemProps"></v-list-item>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="reserve">จอง</v-btn>
        <v-btn variant="text" @click="onDialogModelUpdate(false)">ปิด</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<style></style>