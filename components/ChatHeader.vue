<script setup lang="ts">

const name = ref('Nic')
</script>
<template>
  <div>
    <h1 class="text-4xl font-bold pb-1 gradient-text">Hi There, {{ name }}</h1>
    <h2 class="text-4xl font-bold pb-2 gradient-text">Let's get started.</h2>
    <p class="text-gray-600 mb-4">Type in the chat box of use one the initial prompts to get started.</p>
  </div>
</template>