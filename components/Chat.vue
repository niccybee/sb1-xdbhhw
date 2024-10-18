<script setup lang="ts">
import { useChat } from '@ai-sdk/vue';

const { messages, input, handleSubmit } = useChat();
</script>

<template>
  <NBCard>
    <div class="bg-white flex flex-col w-full ">
      <div v-for="m in messages" :key="m.id" class="whitespace-pre-wrap p-2 flex-col overflow-y-auto">
        <div class=" rounded-lg px-2 mb-2 prose"
          :class="{ 'bg-blue-100 text-blue-800 ml-8': m.role === 'user', 'bg-gray-100 text-gray-800 mr-8': m.role !== 'user' }">
          <span class="uppercase text-xs font-semibold">{{ m.role === 'user' ? 'User: ' : 'AI: ' }}</span>
          <p>{{ m.content }}</p>
        </div>

      </div>

      <form @submit="handleSubmit">
        <div><input class="w-full " v-model="input" placeholder="Say something..." /></div>
        <div>
          <NBButton icon="i-gg-chevron-right" text="Send" />
        </div>
      </form>
    </div>
  </NBCard>
</template>