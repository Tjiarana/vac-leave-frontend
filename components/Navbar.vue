<script lang="ts" setup>

</script>

<template>
  <v-toolbar class="position-sticky top-0 px-2 bg-surface">
    <v-row no-gutters>
      <v-col class="d-flex justify-center ga-4">
        <nuxt-link to="/user">
          <v-btn size="large" class="text-main-text">
            การลา
          </v-btn>
        </nuxt-link>
        <v-btn size="large" class="text-main-text">ผู้ใช้</v-btn>
        <v-btn size="large" class="text-main-text">พนักงาน</v-btn>
      </v-col>
    </v-row>
    <v-btn density="comfortable" icon="mdi-account"></v-btn>
  </v-toolbar>
</template>

<style></style>