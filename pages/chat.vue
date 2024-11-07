<script setup lang="ts">
import { useChatStore } from '~/stores/chat'
import { useUIStore } from '~/stores/ui'
import { useApiKeyStore } from '~/stores/apiKeys'
const chatStore = useChatStore()
const ui = useUIStore()



</script>
<template>
  <aside class="min-w-16 sm:min-w-48 rounded-lg w-auto ">
    <ChatList></ChatList>
  </aside>
  <main class="flex-grow mx-auto w-full p-4 flex flex-col ">
    <section v-auto-animate>
      <ChatHeader v-if="chatStore.currentMessages.length < 1" />
      <ChatQuickStart v-if="chatStore.currentMessages.length < 1" />
    </section>
    <section>
      <Chat />
    </section>
    <!-- <Debug class="w-full" /> 
    <Debug class="w-full" /> -->
  </main>
</template>  

<style scoped></style>