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
</script>

<template>
  <div class="bg-gray-100 p-4 h-full">
    <h2 class="text-xl font-bold mb-4 flex items-center">
      <div class="i-gg-comment text-xl mr-2"></div>
      <span>Conversations</span>
    </h2>
    <ul class="p-0 m-0 list-none">
      <ChatListItem v-if="chats" v-for="chat in chats" :key="chat.id" :chat="chat" @click="selectChat(chat.id)">
      </ChatListItem>
    </ul>
    <button @click="createNewChat" class="btn flex items-center justify-center flex-grow mt-2">
      <div class=" i-gg-math-plus pr-2">
      </div>
      <span>New Chat</span>
    </button>
  </div>
</template>