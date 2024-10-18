<script setup>
import { ref, computed } from 'vue';
import { useChatStore } from '~/stores/chat';
import ChatList from '~/components/ChatList.vue';
import ChatInterfaceOptions from '~/components/ChatInterfaceOptions.vue';

const chatStore = useChatStore();

const currentChat = computed(() => chatStore.currentChat);

const messages = computed(() => currentChat.value.messages);

</script>

<template>
  <div class="flex h-full">
    <!-- <ChatList class="w-1/4 border-r" /> -->
    <div class="flex-grow flex flex-col">
      <div class="card p-4 flex-grow overflow-hidden flex flex-col">

        <div class="flex-grow overflow-y-auto mb-4">
          <ChatInterfaceOptions />
          <ChatInterfaceMessages v-if="currentChat" :messages="messages" />

          <div v-else class="text-center text-gray-500">
            Select a chat or create a new one to start messaging
          </div>
        </div>
        <ChatInterfaceSend />
      </div>
    </div>
  </div>
</template>

