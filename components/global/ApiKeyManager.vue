<script setup lang="ts">
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

</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-2">Add API Key</h2>
    <div class="flex-wrap sm:flex">
      <select v-model="provider" class="input select pr-8 mr-2">
        <option value="openai" selected>OpenAI</option>
        <option value="anthropic">Anthropic</option>
      </select>
      <input v-model="apiKey" type="password" :placeholder="`Enter your ${provider} API key`" class="input flex-grow" />
      <NBButton @click="apiKeyStore.addNewKey({ provider, apiKey })" text="Add API Key"
        buttonType="hover:border-gray-700" />
    </div>
    <p v-if="apiKeyStore.hasApiKey" class="mt-2 text-sm bg-green-200 text-green-800 p-2 rounded-md">
      API key is set
    </p>
    <section>
      <h3>Keys:</h3>
      <ul v-auto-animate class="grid gap-1 grid-cols-1">
        <li class="w-full bg-gray-100 rounded-md concat flex gap-1" v-for="key in keys">
          <div class="uppercase text-xs font-semibold mr-2">{{ key.provider }}</div> <br />
          <div class="text-sm overflow-hidden">{{ key.apiKey }}</div>
          <NBButton @click="apiKeyStore.removeApiKey(key)" buttonType="hover:border ">
            <div class="i-gg-close"></div>
          </NBButton>
        </li>
      </ul>
    </section>
  </div>
</template>