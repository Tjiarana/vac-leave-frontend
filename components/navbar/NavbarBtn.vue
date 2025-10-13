<script lang="ts" setup>
const props = defineProps({
  btnName: {
    type: String,
    require: true
  },
  routerTo: {
    type: String,
    require: true
  }
})

</script>

<template>
  <nuxt-link :to="props.routerTo">
    <v-btn :text="props.btnName" :ripple="false" variant="plain" class="text-primary" />
  </nuxt-link>
</template>

<style scoped></style>