<script setup lang="ts">
import { useChat } from '@ai-sdk/vue';
import { useChatStore, generateUUID } from '../stores/chat';
import { useFileDialog } from '@vueuse/core'
import type Message from '@stores/chats'

const chatForm = ref(null)
const chats = useChatStore();
const ui = useUIStore();
const { currentMessages } = storeToRefs(chats);

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  file?: File | null;
}

const fileInput = ref(null);

const supportsFileUpload = computed(() => true);

const { messages, input, handleSubmit, isLoading, onFinish } = useChat({
  initialMessages: currentMessages.value,
  onResponse(response) {
    // Handle successful response
    console.log('AI response received:', response)
  },
  onFinish: (message, finishOptions) => {
    chats.addMessage(message);
  },

});

const submit = async () => {
  if (!input.trim()) return;

  const message: Message = {
    id: generateUUID(),
    role: 'user',
    content: input.value,
  };

  messages.value.push(message);
  handleSubmit();
  await onFinish(message);

  input.value = '';
}

const loading = ref(true)

onMounted(() => {
  chats.createNewChat()
  loading.value = false;
})

const lockMessageBottom = computed(() => {
  if (ui.engagedMessageMode || chats.currentMessages.length > 0) return true

})

const inputMessage = computed(() => {

})

</script>

<template>
  <!--  <NBCard> -->
  <div class="">

    <ChatMessages :messages="messages" :loading="isLoading" :class="lockMessageBottom ? 'mb-64 h-full' : 'h-auto'">
    </ChatMessages>

    <form @submit.prevent="chats.sendMessage(inputMessage)" class="border-1 bg-white border-gray-300 rounded-lg p-4 "
      ref="chatForm" :class="lockMessageBottom ? 'fixed bottom-2 inset-x-1 w-full' : 'relative'">
      <p class="absolute text-xs text-gray-500 top-2 right-2"></p>
      <ChatInterfaceOptions />

      <div><input :disabled="loading" ref="chatInput" class="w-full rounded-lg border-1 border-gray-1 mb-1"
          v-model="input" :placeholder="loading ? 'Loading...' : 'Say something...'" />
      </div>

      <div class="flex justify-between mt-1">

        <ChatInterfaceFile :supports="supportsFileUpload" />

        <NBButton type="submit" icon="i-gg-chevron-right"
          buttonType="flex items-center justify-center gradient text-white hover:bg-blue-600 transition duration-200"
          text="Send" />
      </div>
    </form>

  </div>
  <!-- </NBCard> -->
</template>