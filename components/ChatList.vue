<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ChatListItem from './ChatListItem.vue'
import { useChatStore } from '~/stores/chat'

const chatStore = useChatStore()
const { chats } = storeToRefs(chatStore)

const selectChat = (chatId) => {
  chatStore.setCurrentChat(chatId);
};

const createNewChat = () => {
  chatStore.createNewChat();
};

const loading = ref(true);

onMounted(() => {
  loading.value = false;
})
</script>

<template>
  <div class="bg-gray-100 p-4 h-full flex sm:block sm:flex-col">
    <h2 class="text-xl font-bold mb-4 flex items-center">
      <div class="i-gg-comment bg-gray-500 text-xl mr-2"></div>
      <span class="hidden sm:block">Conversations</span>
    </h2>
    <ul class="p-0 m-0 list-none flex items-center sm:block" v-auto-animate>
      <ChatListItem v-if="chats" v-for="chat in chats" :key="chat.id" :chat="chat" @click="selectChat(chat.id)">
      </ChatListItem>
    </ul>
    <button v-if="!loading" @click="createNewChat" class="btn flex items-center justify-center sm:flex-grow sm:mt-2">
      <div class=" i-gg-math-plus pr-2"></div>
      <span class="hidden sm:block">New Chat</span>
    </button>
    <LoadSpinner v-else />
  </div>
</template>