<script setup>
import { useKeyboard } from './composables/initKeyboard'
import { useChatStore } from './stores/chat'
import { storeToRefs } from 'pinia'
const chatStore = useChatStore()
const { currentChat } = storeToRefs(chatStore);


const showQuickstart = computed(() => {
  if (currentChat) {
    console.log('current chat progress: ', currentChat.value)
    return false
    // return currentChat.value.messages.length > 0 ? true : false;
  } else {
    true
  }
})

onMounted(() => {
  useKeyboard()
})

// const getOpenAIModels = async () => {
//   const response = await fetch('https://api.openai.com/v1/models', {
//     Authorization: 'Bearer ' + apiKey.value
//   });
//   return response.json();
// }

</script>

<template>
  <NuxtLoadingIndicator />
  <div class="min-h-screen bg-gray-100 flex flex-col">

    <AppHeader />
    <div class="flex">
      <aside class="hidden sm:block sm:min-w-48 rounded-lg w-auto sm:w-16">
        <ChatList></ChatList>
      </aside>
      <main class="flex-grow mx-auto w-full p-4 flex flex-col ">
        <ChatHeader />
        <ChatQuickStart v-if="showQuickstart" v-auto-animate />
        <Chat />
        {{ currentChat }}
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