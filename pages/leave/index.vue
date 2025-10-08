<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useDisplay } from 'vuetify'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import allLocales from '@fullcalendar/core/locales-all'
import type { CalendarOptions } from '@fullcalendar/core/index.js'

definePageMeta({ layout: 'main' })

const { smAndDown, lgAndDown } = useDisplay()
const selectedDate = ref<string>('')
const leaves = ref<any[]>([])
const fcRef = ref<any>()

const isModalOpen = ref(false)
const modalAction = ref<string>('view')

const openModal = (action: string): void => {
  modalAction.value = action
  isModalOpen.value = !isModalOpen.value
}

const actions = [
  { text: 'จองวันลา', icon: 'mdi-calendar-plus-outline', action: 'book' },
  { text: 'อนุมัติวันลา', icon: 'mdi-calendar-check', action: '' },
  { text: 'ประวัติการลา', icon: 'mdi-calendar-clock-outline', action: '' }
]

function api() { return fcRef.value?.getApi?.() }
function updateCalendarSize() { api()?.updateSize() }

onMounted(() => {
  setTimeout(updateCalendarSize, 0)
})

const calendarOptions: CalendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: { right: 'prev next' },
  buttonText: { prev: '<-- เดือนที่แล้ว', next: 'เดือนหน้า -->' },
  dayMaxEvents: false,
  locale: 'th',
  locales: allLocales,
  firstDay: 0,
  height: '100%',
  selectable: false,
  timeZone: 'Asia/Bangkok',
  showNonCurrentDates: false,
  fixedWeekCount: false,
  validRange(now: Date) {
    const d = new Date(now)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return { start: `${yyyy}-${mm}-${dd}` }
  },
  dateClick(info) { console.log('dateClick', info.dateStr) },
  eventClick(info) { console.log('eventClick', info.event.id) },
  events: [
    {
      id: 'L-1010',
      title: 'ลาพักร้อน - คุณอรทัย',
      start: '2025-10-20',
      end: '2025-10-22',   // allDay ใช้ end-exclusive → แสดง 20–21
      allDay: true,
      color: '#00BCD4',
      extendedProps: {
        type: 'ANNUAL', employeeId: 'E077', employeeName: 'Orathai',
        status: 'APPROVED', approver: 'Manager B',
        createdAt: '2025-10-01T10:12:00Z', notes: 'ไปต่างประเทศ'
      }
    },
    {
      id: 'L-1011',
      title: 'ลาป่วย - คุณนนท์',
      start: '2025-10-21T09:00:00',
      end: '2025-10-21T12:00:00',
      color: '#F44336',
      extendedProps: { type: 'SICK', employeeId: 'E088', employeeName: 'Non' }
    },
    { id: 'X1', title: 'ชดเชยวันหยุด', start: '2025-10-28', end: '2025-10-29', allDay: true, color: '#E0F7FA' },
    { id: 'X2', title: 'ชดเชยวันหยุด', start: '2025-10-28', end: '2025-10-29', allDay: true, color: '#E0F7FA' },
    { id: 'X3', title: 'ชดเชยวันหยุด', start: '2025-10-28', end: '2025-10-29', allDay: true, color: '#E0F7FA' },
    { id: 'X4', title: 'ชดเชยวันหยุด', start: '2025-10-28', end: '2025-10-29', allDay: true, color: '#E0F7FA' },
    { id: 'X5', title: 'ชดเชยวันหยุด', start: '2025-10-28', end: '2025-10-29', allDay: true, color: '#E0F7FA' }
  ]
})
</script>

<template>
  <VContainer fluid class="pa-0 bg-surface fill-height d-flex flex-column">
    <v-row no-gutters justify="center" align="center" class="h-100 w-100 ga-4"
      :class="smAndDown ? 'py-4 px-3' : lgAndDown ? 'py-8 px-8' : 'py-16 px-16'">
      <v-col :cols="smAndDown ? 12 : 8.5" class="h-100" :class="smAndDown ? 'order-2' : 'order-1'">
        <v-card class="h-100">
          <v-card-text class="h-100">
            <div class="h-100">
              <FullCalendar ref="fcRef" :options="calendarOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :cols="smAndDown ? 12 : 3" class="elevation-1 pa-4 rounded"
        :class="smAndDown ? 'h-auto order-1' : 'h-100 order-2'">
        <v-row no-gutters justify="center" align="center">
          <v-col class="text-center">
            <h4 class="font-weight-regular" :class="smAndDown ? '' : 'text-h6'">วันลาพักร้อนคงเหลือ</h4>
            <h1 :class="smAndDown ? 'mt-3 mb-5' : 'mt-10 mb-14'">
              <span class="font-weight-thin" :class="smAndDown ? 'text-h2' : 'text-h1'">0</span>
              <span class="text-h6 font-weight-regular">วัน</span>
            </h1>
          </v-col>
        </v-row>
        <v-divider class="border-opacity-25" />
        <v-row no-gutters align="center" class="pt-4">
          <v-col v-for="action in actions" :key="action.text" :cols="smAndDown ? 4 : 6">
            <v-btn @click="openModal(action.action)" class="pa-2" :text="action.text" size="small" variant="text" :prepend-icon="action.icon" rounded="1"
              elevation="0" :stacked="smAndDown ? false : true" :height="smAndDown ? 20 : 60" block />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <LeaveModal @close-modal="isModalOpen = !isModalOpen" :modal-action="modalAction" :is-modal-open="isModalOpen"
      :leaves="leaves" />
  </VContainer>
</template>

<style scoped>
:deep(.fc) {
  height: 100%;
}
</style>
