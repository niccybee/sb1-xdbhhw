<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useApiKeyStore } from '~/stores/apiKeys';
const keyStore = useApiKeyStore();


const showKeyManager = () => {
  if (keyStore.hasApiKey) {
    keyStore.showKeyManager = false;
  } else {
    keyStore.showKeyManager = true;
  }
}
</script>
<template>
  <header class=" p-4 flex items-center justify-between">
    <div class="flex items-center">
      <div class="i-gg-band-aid hover:gradient transition duration-200 text-2xl mr-4"></div>
      <p>Bandaid AI</p>
    </div>
    <div>{{ keyStore }}</div>
    <div class="flex items-center">
      <div class="i-gg-key text-xl  cursor-pointer hover:bg-white transition-all duration-200 rounded-lg mr-4"></div>
      <div @click="showKeyManager"
        class="i-gg-profile text-xl cursor-pointer hover:bg-white transition-all duration-200 rounded-lg">
      </div>
    </div>
    <!--   
    <ApiKeyManager />
    -->
    <NB2Modal v-model="showKeyManager">
      <ApiKeyManager />
    </NB2Modal>
  </header>
</template>