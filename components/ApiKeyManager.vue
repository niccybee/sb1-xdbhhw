<script setup>
import NButton from './ui/NBButton.vue'
import { ref } from 'vue';
import { useApiKeyStore } from '~/stores/apiKeys';

const apiKeyStore = useApiKeyStore();
const apiKey = ref('');
const provider = ref('')

const saveApiKey = async () => {
  const apiKeyValid = await apiKeyStore.testApiKey(apiKey.value, provider.value);
  if (apiKeyValid) {
    apiKeyStore.setApiKey(apiKey.value);
    apiKey.value = '';
  }
};

</script>

<template>
  <div class="card p-4">
    <h2 class="text-lg font-semibold mb-2">OpenAI API Key</h2>
    <div class="flex">
      <select v-model="provider" class="input select pr-8 mr-2">
        <option value="openai" selected>OpenAI</option>
        <option value="anthropic">Anthropic</option>
      </select>
      <input v-model="apiKey" type="password" placeholder="Enter your OpenAI API key" class="input flex-grow" />
      <NButton @click="saveApiKey" text="Add API Key" />
    </div>
    <p v-if="apiKeyStore.hasApiKey" class="mt-2 text-sm text-green-600">
      API key is set
    </p>
  </div>
</template>