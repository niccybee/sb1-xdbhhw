<script setup lang="ts">
import { useChatStore } from '~/stores/chat';
import { useChat } from '@ai-sdk/vue';

const { messages, input, handleSubmit } = useChat();
  
const chatStore = useChatStore();
const userInput = ref('');
const fileInput = ref(null);


</script>
<template>
  <form @submit.prevent="sendMessage" class="grid">
    <input v-model="userInput" type="text" placeholder="Type your message..."
      class="flex-grow border-none rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
    <div class="flex items-center justify-between pt-2">
      <div>
        <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="hidden" />
        <button @click="$refs.fileInput.click()" class="btn flex items-center" :disabled="!supportsFileUpload">
          <div class="i-gg-attachment pr-1"></div>
          <p>Add Attachment</p>
        </button>
      </div>
      <div>
        <button type="submit" class="btn bg-blue-700 text-white">
          <div class="i-gg-chevron-double-right text-xl"></div>
        </button>
      </div>
    </div>
  </form>
</template>