<script lang="ts" setup>
import NavbarBtn from './NavbarBtn.vue';
</script>

<template>
  <v-toolbar class="position-sticky top-0 px-4 bg-surface elevation-4 navbar">
    <v-row no-gutters align="center">
      <v-col class="d-flex justify-center ga-6">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" :text="props.btnName" :ripple="false" variant="plain"
              class="text-primary" append-icon="mdi-menu-down">
              การลา
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item to="/leave" variant="plain" :ripple="false">
              <v-list-item-title class="text-primary">ภาพรวม</v-list-item-title>
            </v-list-item>
            <v-list-item variant="plain" :ripple="false">
              <v-list-item-title class="text-primary">อนุมัติวันลา</v-list-item-title>
            </v-list-item>
            <v-list-item variant="plain" :ripple="false">
              <v-list-item-title class="text-primary">ประวัติการลา</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <navbar-btn :btn-name="'จัดการพนักงาน'" :router-to="'/employee'" />
      </v-col>
      <v-btn density="comfortable" icon="mdi-account" color="secondary" />
    </v-row>
  </v-toolbar>
</template>

<style scoped>
.navbar {
  z-index: 1000;
}
</style>