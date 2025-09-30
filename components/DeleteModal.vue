<script lang="ts" setup>
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
  targetId: {
    type: String as PropType<string | null>,
    default: null
  }
})

const emit = defineEmits(['closeModal', 'refetchAllEmployee'])

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

const deleteEmployee = async () => {
  await useApi().deleteUser(props.targetId)
  if (true) {
    onDialogModelUpdate(false)
    emit('refetchAllEmployee')
  }
}
</script>

<template>
  <v-dialog v-model="isModalOpen" @update:model-value="onDialogModelUpdate" max-width="400" max-height="600">
    <v-card>
      <template #text>
        <v-row no-gutters>
          <v-col class="d-flex justify-center align-center" cols="12">
            <div class="bg-red-lighten-5 rounded-pill pa-2">
              <v-icon color="error" icon="mdi-alert-outline" size="x-large"/>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters align-center class="mt-4">
          <v-col cols="12">
            <p class="text-center font-weight-bold text-h6">ลบพนักงาน</p>
            <p class="text-center mt-1">
              คุณยืนยันที่จะลบพนักงานรหัส 
              <span class="rounded bg-grey-lighten-3 text-grey-darken-1 text-subtitle-2 px-2 py-1">
                {{ targetId }}
              </span> หรือไม่
            </p>
          </v-col>
        </v-row>
      </template>

      <v-divider />

      <v-card-actions class="bg-surface-light">
        <v-btn @click="deleteEmployee" text="ยืนยัน" color="error" variant="flat" ripple />
        <v-btn @click="onDialogModelUpdate(false)" text="ยกเลิก" variant="plain" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style></style>