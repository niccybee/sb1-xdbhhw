<script setup lang="ts">

const props = defineProps(['chat'])
const chats = useChatStore();
const ui = useUIStore();

</script>
<template>
  <li class="mb-2 list-none w-full ">
    <div class="bg-none flex justify-between items-center border-b border-b-gray-300 hover:border-gray-400  rounded-r-lg"
      :class="{
        'bg-white': props.chat.id === chats.currentChatId, 'hover:bg-gray-100': chat.id !==
          chats.currentChatId
      }">
      <button class="flex-grow p-2 w-full">{{ ui.hideSidebar ? '' : chat.name }}</button>
      <button class="hover:bg-white text-xl p-2 rounded-lg" @click="chats.removeChat(id)">
        <div class="i-gg-close" :class="ui.hideSidebar ? 'text-xs' : ''"></div>
      </button>
    </div>
  </li>
</template>