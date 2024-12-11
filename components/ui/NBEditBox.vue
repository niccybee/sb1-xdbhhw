<script setup lang="ts">
const model = defineModel('model', {
  default: 'Text input',
  required: false
})

const value = ref('');

const edit = ref(false)

const toggleEdit = () => {
  edit.value = !edit.value
}
const loading = ref(true)

onMounted(() => {
  loading.value = false;
})

const emits = defineEmits(['update:model'])



</script>
<template>
  <div v-if="!loading" class="flex items-center justify-between" v-auto-animate>
    <p class="mr-2 min-w-48 h-8" v-if="!edit">{{ model }}</p>
    <input class="mr-2 min-w-48 h-8" v-else type="text" v-model="model" />
    <button @click="toggleEdit">
      <div v-if="!edit" class="i-gg-pen"></div>
      <div v-else class="i-gg-check-o"></div>
    </button>
  </div>
  <div v-else class="flex items-center justify-between">
    <div class="animate-pulse flex space-x-4">
      <div class="rounded-lg bg-gray-200 h-8 min-w-48"></div>
      <div class="flex-1 space-y-4 py-1">
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
</template>