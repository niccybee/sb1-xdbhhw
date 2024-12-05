<script setup lang="ts">

const props = defineProps<{
  message: Message;
}>()

const state: Ref<'ready' | 'loading' | 'complete'> = ref('ready');

const copyToClipboard = async (message: string) => {
  state.value = 'ready';
  navigator.clipboard.writeText(message).then(() => {
    state.value = 'loading';
    console.log('Message copied to clipboard');
  }).catch(err => {
    console.error('Could not copy text: ', err);
  }).finally(() => {
    state.value = 'complete';
  })

};

</script>
<template>
  <div class="flex items-end justify-end relative bg-green-1">
    <button class="btn bg-grey-100 hover:bg-white text-xl p-2 mx-1 rounded-lg absolute right-2 top-2"
      @click="copyToClipboard(props.message.content)">
      <LoadSpinner v-if="state === 'loading'" class="animate-spin" />

      <div class="i-gg-check" v-else-if="state === 'complete'"></div>
      <div class="i-gg-copy" v-else></div>
    </button>
  </div>
  <span class="uppercase text-xs font-semibold">{{ props.message.role === 'user' ? 'User: ' : 'AI: ' }}</span>
  <MDC :value="props.message.content" tag="article" class="prose" />
</template>
<style scoped></style>