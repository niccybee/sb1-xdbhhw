<script setup lang="ts">
import { useChat } from '@ai-sdk/vue';
import { useChatStore, generateUUID } from '../stores/chat';

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  file?: File | null;
}

const chatStore = useChatStore();
const { currentMessages } = storeToRefs(chatStore);

const fileInput = ref(null);

const supportsFileUpload = computed(() => true);

const { messages, input, handleSubmit, isLoading } = useChat({
  initialMessages: currentMessages.value,
  onResponse(response) {
    // Handle successful response
    console.log('AI response received:', response)
  },
  onFinish: (message) => {
    chatStore.addMessage(message);
  }
});

const sendMessage = () => {
  if (input.value.trim() === '') return;

  chatStore.addMessage({
    id: generateUUID(),
    role: 'user',
    content: input
  });

  handleSubmit();

}
const loading = ref(true)

onMounted(() => {
  loading.value = false;
})

</script>

<template>
  <NBCard>
    <div class="flex flex-col w-full ">

      <ChatInterfaceMessages :messages="messages" :loading="isLoading" />

      <!-- <div class="rounded-lg p-1 hover:gradient transition-all duration-200 cursor-pointer" @click="enterChat"> -->
      <form @submit.prevent="handleSubmit" class="border-1 bg-white border-gray-300 rounded-lg p-4"
        :class="chatStore.currentMessages.length > 0 ? 'fixed bottom-2 inset-x-1 w-full' : ''">
        <ChatInterfaceOptions />

        <div><input :disabled="loading" ref="chatInput" class="w-full rounded-lg border-1 border-gray-1 mb-1"
            v-model="input" :placeholder="loading ? 'Loading...' : 'Say something...'" />
        </div>

        <div class="flex justify-between mt-1">
          <button @click="$refs.fileInput.click()" class="btn flex items-center hover:bg-gray-200"
            :disabled="!supportsFileUpload">

            <div class="i-gg-attachment pr-1"></div>
            <p>Add Attachment</p>
          </button>

          <NBButton type="submit" icon="i-gg-chevron-right"
            buttonType="flex items-center justify-center gradient text-white hover:bg-blue-600 transition duration-200"
            text="Send" />
        </div>
      </form>
      <!-- </div> -->
    </div>
  </NBCard>
</template>