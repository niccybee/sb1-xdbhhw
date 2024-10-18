<script setup lang="ts">
const props = defineProps<{
  messages: any[];
}>()
</script>

<template>
  <div>
    <div v-for="message in messages" :key="message.id" class="mb-2">
      <div :class="[
        'p-2 rounded-lg prose',
        message.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
      ]">
        <template v-if="message.file">
          <img :src="message.file" alt="Uploaded image" class="max-w-full h-auto mb-2" />
        </template>
        {{ message.content }}
      </div>
    </div>
  </div>
</template>