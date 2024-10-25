<script setup lang="ts">
import { useChatStore } from '~/stores/chat';

const props = defineProps(['chat'])
const chatStore = useChatStore();

</script>
<template>
  <li class="mb-2 list-none w-full">
    <button class="bg-none border-b border-b-gray-300 hover:border-gray-400 p-2 w-full rounded-r-lg" :class="{
      'bg-gray-200': props.chat.id === chatStore.currentChatId, 'hover:bg-gray-100': chat.id !==
        chatStore.currentChatId
    }">
      <div>{{ chat.name }}</div>
      <div class="i-gg-right-arrow text-xl"></div>
    </button>
  </li>
</template>