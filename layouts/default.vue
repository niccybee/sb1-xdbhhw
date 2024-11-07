<script setup lang="ts"></script>
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <AppHeader />
    <div class="block sm:flex">
      <slot />
    </div>
  </div>
</template>  