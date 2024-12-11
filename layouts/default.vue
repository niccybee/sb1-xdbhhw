<template>
  <NuxtLoadingIndicator></NuxtLoadingIndicator>
  <div class="min-h-screen bg-gray-100 app-layout">
    <AppHeader></AppHeader>
    <div class="block sm:flex">
      <slot />
    </div>
    <!--<AppFooter></AppFooter> -->
  </div>
</template>  

<style scoped>
.app-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
}
</style>