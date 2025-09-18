<script lang="ts" setup>
import NavbarBtn from './NavbarBtn.vue';
</script>

<template>
  <v-toolbar class="position-sticky top-0 px-4 bg-surface">
    <v-row no-gutters align="center">
      <v-col class="d-flex justify-center ga-6">
        <navbar-btn :btn-name="'การลา'" :router-to="'/leave'"/>
        <navbar-btn :btn-name="'จัดการพนักงาน'" :router-to="'/employee'"/>
      </v-col>
      <v-btn density="comfortable" icon="mdi-account" color="sub-text"></v-btn>
    </v-row>
  </v-toolbar>
</template>

<style scoped></style>