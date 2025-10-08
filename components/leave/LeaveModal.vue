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
</script>

<template>
  <v-dialog v-model="isModalOpen" @update:model-value="onDialogModelUpdate" max-width="500" max-height="400" scrollable>
    <v-card>
      <v-card-title>
        <span v-if="props.modalAction == 'book'">จองวันลา</span>
      </v-card-title>
      <v-divider />
      <v-card-text>

      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="onDialogModelUpdate(false)">ปิด</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<style></style>