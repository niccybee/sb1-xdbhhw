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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0;
  margin: 0;
}

input[type="color"],
input[type="date"],
input[type="datetime"],
input[type="datetime-local"],
input[type="email"],
input[type="month"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
input[type="week"],
select:focus,
textarea {
  font-size: 16px;
}
</style>