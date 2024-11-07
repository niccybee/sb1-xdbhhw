<script setup lang="ts">
import useMarkdownParser from '~/composables/useMarkdownParser';
import TsLang from 'shiki/langs/typescript.mjs'
const props = defineProps<{
  messages: any[];
  loading: boolean;
}>()

const messageTesting = ref([
  {
    id: 0,
    role: 'user',
    content: "Hello, how are you?"
  },
  {
    id: 1,
    role: "ai",
    content: "::alert This is an Alert :: \n## Heading \nI'm doing well, thank you. How can I assist you today?  \n- One \n- Two \n- Three \n ```ts const parse = useMarkdownParser() \n const text = parse('Hello World') \n console.log(text)```"
  }
])

const newMessage = {
  id: messageTesting.value.length,
  role: messageTesting.value.length % 2 ? 'user' : 'ai',
  content: "I am a new message \n ```ts const parse = useMarkdownParser() \n const text = parse() ```"
}


</script>

<template>
  <div>
    <ul id="message-list" class="whitespace-pre-wrap p-2 flex flex-col overflow-y-auto max-h-[60svh] list-none">
      <li class="rounded-lg mb-2 w-5/6 p-2" v-for="m in messages" :key="m.id" :class="{
        'bg-blue-100 text-blue-800 self-end': m.role === 'user',
        'bg-white text-gray-800 self-start': m.role !== 'user'
      }" v-auto-animate>
        <span class="uppercase text-xs font-semibold">{{ m.role === 'user' ? 'User: ' : 'AI: ' }}</span>
        <!-- <p>{{ m.content }}</p> -->
        <MDC :value="m.content" tag="article" class="prose" />



      </li>

    </ul>
    <div v-show="loading" class="animate-pulse w-full h-8 bg-gray-300 rounded-full"></div>
 <!--    <button @click="messageTesting.push(newMessage)">Add
      Message</button> -->
  </div>
</template>