<script setup lang="ts">
import { useFileDialog } from '@vueuse/core'

const props = defineProps({
  supports: Boolean
})

const { files, open, reset, onCancel, onChange } = useFileDialog({
  accept: 'image/*', // Set to accept only image files
  directory: true, // Select directories instead of files if set true
})

onChange((files) => {
  /** do something with files */
})

onCancel(() => {
  /** do something on cancel */
})
</script>
<template>
  <button @click="" class="btn flex items-center hover:bg-gray-200" :disabled="!supports">

    <div class="i-gg-attachment pr-1"></div>
    <p>Add Attachment</p>
  </button>
</template>