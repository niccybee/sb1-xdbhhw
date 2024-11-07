<script setup lang="ts">
import { useChatStore } from '~/stores/chat';
const chatStore = useChatStore();

const quickStarts = [
  { id: 0, title: 'GPT-4 Messages', content: 'GPT-4 is a powerful language model that can generate high-quality text based on a given prompt.', provider: 'openai', model: 'gpt-4', icon: 'i-gg-comment' },
  { id: 1, title: 'Claude Emails', content: 'Claude is a powerful language model that can generate high-quality emails based on a given prompt.', icon: 'i-gg-mail' },
  { id: 2, title: 'Claude Instant', content: 'Claude Instant is a powerful language model', icon: 'i-gg-bolt' },
  { id: 3, title: 'Resume Writer', content: 'Resume Writer is a powerful language model that can generate high-quality resumes based on a given prompt.', icon: 'i-gg-file-document' }
];
</script>

<template>
  <div class="py-4 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
    <NBCard v-for="start in quickStarts"
      class="card card-dashboard p-2  border-1 border-gray-300 flex flex-col justify-between" :key="start.id">
      <div class="prose ">
        <h3>{{ start.title }}</h3>
        <p>{{ start.content }}</p>

      </div>
      <div :class="start.icon" class="text-xl bg-gray-700"></div>
    </NBCard>
  </div>
</template>