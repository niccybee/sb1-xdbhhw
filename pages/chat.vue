<script setup lang="ts">
import { useChatStore } from '~/stores/chat'
import { useUIStore } from '~/stores/ui'
const chat = useChatStore()
const ui = useUIStore()

const showHeader = computed(() => {
  return !ui.hideIntroHeader && chat.currentMessages.length < 1
})

const showQuickstart = computed(() => {
  return !ui.hideQuickStartAction && chat.currentMessages.length < 1
})

const hideStartSection = computed(() => {
  return showHeader.value && showQuickstart.value;
})

</script>
<template>
  <aside class="rounded-lg w-auto " :class="ui.hideSidebar ? 'min-w-8' : 'min-w-16 sm:min-w-48'">
    <ChatList></ChatList>
  </aside>
  <main class="flex-grow mx-auto w-full p-4 flex flex-col ">
    <section v-auto-animate class="h-full flex flex-col justify-end" v-show="!showHeader && !showQuickstart">
      <ChatHeader v-if="showHeader" />
      <ChatQuickStart v-if="showQuickstart" />
    </section>
    <section class="h-full ">
      <Chat class="h-full " />
    </section>
  </main>
</template>  

<style scoped></style>