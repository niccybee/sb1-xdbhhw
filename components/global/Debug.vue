<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '../stores/chat'
import { useApiKeyStore } from '../stores/apiKeys'

const showDebug = ref(false)
const props = defineProps(['data'])

const chatStore = storeToRefs(useChatStore())
const apiKeyStore = storeToRefs(useApiKeyStore())


</script>

<template>
  <div v-if="showDebug">
    <p>
      <span class="font-bold">Chats:</span>
      <code>{{ chatStore }}</code>
    </p>
    <span class="font-bold">Keys</span>
    <p>{{ apiKeyStore }}</p>

    <p>
      <span class="font-bold">Data:</span>
      <code>{{ data }}</code>
    </p>
    <NButton @click="showDebug = false" class="btn border-1" text="Hide Debug" />
  </div>
  <div v-else>
    <NBButton @click="showDebug = true" class="btn" text="Show Debug" />
  </div>
</template>

<!--<div
  class="absolute inset-x-0 bottom-0 bg-gray-100 p-4 flex justify-between items-center border border-1 bg-white rounded-t-lg z-100">  </div>-->