<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-white shadow p-4">
      <h1 class="text-2xl font-bold text-center">AI Chat App</h1>
    </header>
    <main class="flex-grow container mx-auto p-4 flex">
      <ChatInterface class="w-full h-[calc(100vh-8rem)]" />
    </main>
  </div>
</template>

<script setup>
import ChatInterface from '~/components/ChatInterface.vue';
</script>