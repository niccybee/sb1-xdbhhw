<script setup>
import NButton from './ui/NBButton.vue'
import { ref } from 'vue';
import { useApiKeyStore } from '~/stores/apiKeys';
import { storeToRefs } from 'pinia'

const apiKeyStore = useApiKeyStore();
const { keys } = storeToRefs(apiKeyStore);
const apiKey = ref('');
const provider = ref('')

const { showKeyManager } = storeToRefs(apiKeyStore)

const saveApiKey = async () => {
  const apiKeyValid = await apiKeyStore.testApiKey(apiKey.value, provider.value);
  if (apiKeyValid) {
    apiKeyStore.keys.push(apiKey.value, provider.value)
    apiKeyStore.setApiKey(apiKey.value);
    apiKeyStore.setProvider(provider.value);
    apiKey.value = '';
  }
};


</script>

<template>
  <h2 class="text-lg font-semibold mb-2">Add API Key</h2>
  <form class="flex-wrap sm:flex">
    <select v-model="provider" class="input select pr-8 mr-2">
      <option value="openai" selected>OpenAI</option>
      <option value="anthropic">Anthropic</option>
    </select>
    <input v-model="apiKey" type="password" placeholder="Enter your OpenAI API key" class="input flex-grow" />
    <NButton @click="saveApiKey" text="Add API Key" buttonType="hover:border-gray-700" />
  </form>
  <p v-if="apiKeyStore.hasApiKey" class="mt-2 text-sm text-green-600">
    API key is set
  </p>
  <ul v-auto-animate>
    <li v-for="key in keys">{{ key }}</li>
  </ul>
</template>