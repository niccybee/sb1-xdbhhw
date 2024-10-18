<template>
  <div class="bg-gray-100 p-4 h-full">
    <h2 class="text-xl font-bold mb-4">Chats</h2>
    <ul>
      <li v-for="chat in chatStore.chats" :key="chat.id" class="mb-2">
        <button
          @click="selectChat(chat.id)"
          class="w-full text-left p-2 rounded"
          :class="{ 'bg-blue-500 text-white': chat.id === chatStore.currentChatId, 'hover:bg-gray-200': chat.id !== chatStore.currentChatId }"
        >
          {{ chat.name }}
        </button>
      </li>
    </ul>
    <button
      @click="createNewChat"
      class="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      New Chat
    </button>
  </div>
</template>

<script setup>
import { useChatStore } from '~/stores/chat';

const chatStore = useChatStore();

const selectChat = (chatId) => {
  chatStore.setCurrentChat(chatId);
};

const createNewChat = () => {
  chatStore.createNewChat();
};
</script>