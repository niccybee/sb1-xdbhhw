<template>
  <div class="flex h-full">
    <ChatList class="w-1/4 border-r" />
    <div class="flex-grow flex flex-col">
      <div class="bg-white rounded-lg shadow p-4 flex-grow overflow-hidden flex flex-col">
        <div class="mb-4 flex space-x-4">
          <select v-model="selectedProvider" class="border rounded p-2">
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
          </select>
          <select v-model="selectedModel" class="border rounded p-2">
            <option v-for="model in availableModels" :key="model" :value="model">
              {{ model }}
            </option>
          </select>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            accept="image/*"
            class="hidden"
          />
          <button
            @click="$refs.fileInput.click()"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            :disabled="!supportsFileUpload"
          >
            Upload File
          </button>
        </div>
        <div class="flex-grow overflow-y-auto mb-4">
          <div v-if="currentChat">
            <div v-for="message in currentChat.messages" :key="message.id" class="mb-2">
              <div :class="[
                'p-2 rounded-lg',
                message.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              ]">
                <template v-if="message.file">
                  <img :src="message.file" alt="Uploaded image" class="max-w-full h-auto mb-2" />
                </template>
                {{ message.content }}
              </div>
            </div>
          </div>
          <div v-else class="text-center text-gray-500">
            Select a chat or create a new one to start messaging
          </div>
        </div>
        <form @submit.prevent="sendMessage" class="flex">
          <input
            v-model="userInput"
            type="text"
            placeholder="Type your message..."
            class="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useChatStore } from '~/stores/chat';
import ChatList from '~/components/ChatList.vue';

const chatStore = useChatStore();
const userInput = ref('');
const selectedProvider = ref('openai');
const selectedModel = ref('gpt-3.5-turbo');
const fileInput = ref(null);

const currentChat = computed(() => chatStore.currentChat);

const availableModels = computed(() => {
  if (selectedProvider.value === 'openai') {
    return ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-vision-preview'];
  } else if (selectedProvider.value === 'anthropic') {
    return ['claude-2', 'claude-instant-1'];
  }
  return [];
});

const supportsFileUpload = computed(() => {
  return selectedModel.value === 'gpt-4-vision-preview';
});

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target.result;
      await chatStore.sendMessage('', selectedProvider.value, selectedModel.value, base64Image);
    };
    reader.readAsDataURL(file);
  }
};

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  const message = userInput.value;
  userInput.value = '';

  await chatStore.sendMessage(message, selectedProvider.value, selectedModel.value);
};
</script>