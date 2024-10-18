<script setup lang="ts">
import { useChatStore } from '~/stores/chat';

const chatStore = useChatStore();
const loading = ref(false);

const availableModels = computed(() => {
  if (chatStore.selectedProvider === 'openai') {
    return ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-vision-preview'];
  } else if (chatStore.selectedProvider === 'anthropic') {
    return ['claude-2', 'claude-instant-1'];
  }
  return [];
});

const getOpenAIModels = async () => {
  const response = await fetch('https://api.openai.com/v1/models')
  return await response.json();
}

// const models = await getOpenAIModels();

</script>
<template>
  <div class="mb-4 flex space-x-4 mx-1 mt-1">
    <select v-model="chatStore.selectedProvider" class="input select pr-8 ">
      <option value="openai" selected>OpenAI</option>
      <option value="anthropic">Anthropic</option>
    </select>
    <select v-model="chatStore.selectedModel" class="input select">
      <option v-for="model in availableModels" :key="model" :value="model">
        {{ model }}
      </option>
    </select>

  </div>
</template>