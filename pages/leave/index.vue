<script lang="ts" setup>
import { useDisplay } from 'vuetify';

definePageMeta({
  layout: 'main',
  middleware: ['auth']
})

const { xs, smAndDown, sm, md, lg, lgAndDown, xl, xlAndUp, xxl, width, name } = useDisplay()
</script>
<template>
  <VContainer fluid class="pa-0 bg-surface fill-height d-flex flex-column">
    <v-calendar type="day" />
  </VContainer>
</template>


<style scoped></style>