<script setup lang="ts">

const props = defineProps<{
  messages: any[];
  loading: boolean;
}>()

const messagesToShow = computed(() => {
  return props.messages.slice(0, 10);

})

</script>

<template>
  <div class="">
    <ul id="message-list" class="whitespace-pre-wrap p-2 flex flex-col overflow-y-auto max-h-[60svh] list-none">
      <li class="rounded-lg mb-2 w-5/6 p-2 " v-for="m in props.messages" :key="m.id" :class="{
        'bg-blue-100 text-blue-800 self-end': m.role === 'user',
        'bg-white text-gray-800 self-start': m.role !== 'user'
      }" v-auto-animate>
        <ChatMessagesItem :message="m"></ChatMessagesItem>

      </li>

    </ul>
    <div v-show="loading" class="animate-pulse w-full h-8 bg-gray-300 rounded-full"></div>
    <!--    <button @click="messageTesting.push(newMessage)">Add
      Message</button> -->
  </div>
</template>