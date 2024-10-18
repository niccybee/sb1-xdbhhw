<script setup>
// components
// import ChatInterface from '~/components/ChatInterface.vue';
// import ApiKeyManager from '~/components/ApiKeyManager.vue';
// import Debug from '~/components/Debug.vue';
// import AppHeader from '~/components/AppHeader.vue';
// stores
import { storeToRefs } from 'pinia'
import { useApiKeyStore } from '~/stores/apiKeys';
const { apiKey } = storeToRefs(useApiKeyStore());

const getOpenAIModels = async () => {
  const response = await fetch('https://api.openai.com/v1/models', {
    Authorization: 'Bearer ' + apiKey.value
  });
  return response.json();
}

</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">

    <AppHeader />
    <div class="flex">
      <aside class="bg-blue-200 min-w-48 rounded-lg w-auto sm:w-16">
        <ChatList></ChatList>
      </aside>
      <main class=" flex-grow mx-auto w-full p-4 flex flex-col">
        <!--
        <NBModal>
          <ApiKeyManager />
        </NModal>
        -->
        <!--  <NBButton icon="i-gg-key" class="btn" text="API Key Manager" /> -->
        <ChatQuickStart />
        <Chat />
        <Debug class="w-full" />
      </main>
    </div>
  </div>
</template>

<style>
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0;
  margin: 0;
}
</style>