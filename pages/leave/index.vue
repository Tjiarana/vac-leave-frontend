<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'


definePageMeta({
  layout: 'main',
  middleware: ['auth']
})

const { xs, smAndDown, sm, md, lg, lgAndDown, xl, xlAndUp, xxl, width, name } = useDisplay()

const options = {
  plugins: []
}
</script>
<template>
  <VContainer fluid class="pa-0 bg-surface fill-height d-flex flex-column">
    
  </VContainer>
</template>


<style scoped></style>