<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ChatListItem from './ChatListItem.vue'
import { useChatStore } from '~/stores/chat'
import { useUIStore } from '~/stores/ui'

const chatStore = useChatStore()
const { chats } = storeToRefs(chatStore)
const ui = useUIStore()

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
  <div class=" p-2 sm:p-1 h-full flex sm:flex-col">
    <h2 class="text-xl font-bold mb-4 flex items-center px-2">
      <div v-if="ui.hideSidebar" class="i-gg-comment cursor-pointer hover:i-gg-chevron-right bg-gray-500 text-xl"
        @click="ui.hideSidebar = false"></div>
      <div v-else class="i-gg-comment hover:i-gg-chevron-left bg-gray-500 text-xl mr-2" @click="ui.hideSidebar = true">
      </div>
      <span v-if="!ui.hideSidebar" class="hidden sm:block">Conversations</span>
    </h2>
    <ul class="p-0 m-0 list-none flex items-center sm:block" v-auto-animate>
      <ChatListItem v-if="chats" v-for="chat in chats" :key="chat.id" :chat="chat" @click="selectChat(chat.id)">
      </ChatListItem>
    </ul>
    <button v-if="!loading" @click="createNewChat"
      class="btn flex sm:min-w-6 items-center justify-center sm:flex-grow sm:mt-2 max-h-16">
      <div class=" i-gg-math-plus pr-2"></div>
      <span class="hidden sm:block">{{ ui.smallSidebar ? '' : 'New Chat' }}</span>
    </button>
    <LoadSpinner v-else />
  </div>
</template>

<style scoped></style>