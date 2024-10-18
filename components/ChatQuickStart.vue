<script setup lang="">
import {useChatStore } from '~/stores/chat';
  import { useChat } from '@ai-sdk/vue';

  const { messages } = useChat();
  
  const {currentChat} = useChatStore();

const haveCurrentChat = computed(() => currentChat.value !== null);

const showQuickStart = computed(()=> {
  if(haveCurrentChat) {
    return currentChat > 0 ? false : true;
  } else {
    return true;
  }
  
})

const hasMessages = computed(() => messages.value.length > 0);
  
  const quickStarts = [
    {id: 0, title: 'GPT-4 Messages', content: 'GPT-4 is a powerful language model that can generate high-quality text based on a given prompt.', provider: 'openai', model: 'gpt-4'},
    {id: 1, title: 'Claude Emails', content: 'Claude is a powerful language model that can generate high-quality emails based on a given prompt.'},
    {id: 2, title: 'Claude Instant', content: 'Claude Instant is a powerful language model' },
    {id: 3, title: 'Resume Writer', content: 'Resume Writer is a powerful language model that can generate high-quality resumes based on a given prompt.' }
  ];
</script>

<template>
  <div class="py-4 w-full grid grid-cols-4 gap-2" v-if="!hasMessages">
    <NBCard v-for="start in quickStarts"
      class="card bg-none border-1 border-gray-300 p-2 hover:bg-gray-100 transition-color duration-200" :key="start.id">
      <div class="prose">
        <h3>{{ start.title }}</h3>
        <p>{{ start.content }}</p>
      </div>
    </NBCard>
  </div>
</template>