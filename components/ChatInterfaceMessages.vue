<script setup lang="ts">
const props = defineProps<{
  messages: any[];
}>()
</script>

<template>
  <div>
    <ul v-for="m in messages" :key="m.id" class="whitespace-pre-wrap p-2 flex-col overflow-y-auto" v-auto-animate>
      <li class=" rounded-lg px-2 mb-2 prose"
        :class="{ 'bg-blue-100 text-blue-800 ml-8': m.role === 'user', 'bg-white text-gray-800 mr-8': m.role !== 'user' }">
        <span class="uppercase text-xs font-semibold">{{ m.role === 'user' ? 'User: ' : 'AI: ' }}</span>
        <p>{{ m.content }}</p>
      </li>

    </ul>
  </div>
</template>