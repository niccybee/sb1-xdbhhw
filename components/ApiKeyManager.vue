<script setup lang="ts">
import NButton from './ui/NBButton.vue'
import { ref } from 'vue';
import { useApiKeyStore } from '~/stores/apiKeys';
import { storeToRefs } from 'pinia'

const apiKeyStore = useApiKeyStore();
const { keys } = storeToRefs(apiKeyStore);
const apiKey = ref('');
const provider = ref('')

interface Key {
  provider: string;
  key: string;
}

const addKey = () => {
  apiKeyStore.addNewKey({ provider.value, apiKey.value, });
}



</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-2">Add API Key</h2>
    <form class="flex-wrap sm:flex">
      <select v-model="provider" class="input select pr-8 mr-2">
        <option value="openai" selected>OpenAI</option>
        <option value="anthropic">Anthropic</option>
      </select>
      <input v-model="apiKey" type="password" placeholder="Enter your OpenAI API key" class="input flex-grow" />
      <NButton @click="addKey" text="Add API Key" buttonType="hover:border-gray-700" />
    </form>
    <p v-if="apiKeyStore.hasApiKey" class="mt-2 text-sm bg-green-200 text-green-800 p-2 rounded-md">
      API key is set
    </p>
    <section>
      <h3>Keys:</h3>
      <ul v-auto-animate>
        <li class="w-full bg-gray-100 rounded-md concat h-8 overflow-x" v-for="key in keys">
          <span class="uppercase text-xs font-semibold">{{ key.provider }}</span> <br />
          <span class="text-sm">{{ key.key }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>