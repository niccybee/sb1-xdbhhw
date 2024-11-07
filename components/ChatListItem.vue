<script setup lang="ts">
import { useChatStore } from '~/stores/chat';

const props = defineProps(['chat'])
const chatStore = useChatStore();

</script>
<template>
  <li class="mb-2 list-none w-full h">
    <div class="bg-none flex justify-between items-center border-b border-b-gray-300 hover:border-gray-400  rounded-r-lg"
      :class="{
        'bg-white': props.chat.id === chatStore.currentChatId, 'hover:bg-gray-100': chat.id !==
          chatStore.currentChatId
      }">
      <button class="flex-grow p-2 w-full">{{ chat.name }}</button>
      <button class="hover:bg-white text-xl p-2 rounded-lg" @click="chatStore.removeChat(id)">
        <div class="i-gg-close"></div>
      </button>
    </div>
  </li>
</template>