<script setup lang="ts">
const showDebug = ref(false)
const props = defineProps(['data'])

const chats = useChatStore()
const keys = useApiKeyStore()
const flows = useFlowsStore()


</script>

<template>
  <div v-if="showDebug">
    <p>
      <span class="font-bold">Chats:</span>
      <code>{{ chats }}</code>
    </p>
    <p>
      <span class="font-bold">Flows:</span>
      <code>{{ flows }}</code>
    </p>
    <span class="font-bold">Keys</span>
    <p>{{ keys }}</p>

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