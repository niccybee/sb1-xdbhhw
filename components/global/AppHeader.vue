<script setup lang="ts">
import { useUIStore } from '~/stores/ui'

const ui = useUIStore()

const loading = ref(true);

onMounted(() => {
  loading.value = false;
})

</script>
<template>
  <header class="p-2 flex items-center justify-between border-b border-gray-200">
    <nuxt-link to="/" class="flex items-center gap-2 hover:bg-gray-3 transition duration-200 p-2 rounded-md">
      <div class="flex items-center">
        <div class="i-gg-band-aid hover:gradient transition duration-200 text-2xl mr-2"></div>
        <p class="">Bandaid AI</p>
      </div>
    </nuxt-link>
    <section class="flex items-center gap-2">
      <nuxt-link to="/chat" class="flex items-center hover:bg-white transition-all duration-200 p-2 rounded-md">
        <div class="i-gg-comment text-xl mr-1"></div>
        <p>Chat</p>
      </nuxt-link>
      <nuxt-link to="/flows" class="flex items-center hover:bg-white transition-all duration-200 p-2 rounded-md">
        <div class=" i-gg-arrow-long-down-e text-xl"></div>
        <p>Flows</p>
      </nuxt-link>
      <nuxt-link to="/design" class="flex items-center hover:bg-white transition-all duration-200 p-2 rounded-md">
        <div class=" i-gg-pen text-xl mr-1"></div>
        <p>Design</p>
      </nuxt-link>
    </section>
    <div class="flex items-center">
      <button :disabled="loading" @click="ui.showDebug = true"
        class="hover:bg-white transition-all duration-200 p-2 rounded-md items-center justify-center flex mr-4">
        <div v-if="!loading" class=" i-gg-debug text-xl cursor-pointer  rounded-lg "></div>
        <LoadSpinner v-else />
      </button>
      <button :disabled="loading" @click="ui.showSettings = true"
        class="hover:bg-white transition-all duration-200 p-2 rounded-md items-center justify-center flex mr-4">
        <div v-if="!loading" class="i-gg-disc text-xl cursor-pointer rounded-lg "></div>
        <LoadSpinner v-else />
      </button>
      <button :disabled="loading" @click="ui.showKeyManager = true"
        class="hover:bg-white transition-all duration-200 p-2 rounded-md items-center justify-center flex mr-4">
        <div v-if="!loading" class="i-gg-key text-xl  cursor-pointer rounded-lg "></div>
        <LoadSpinner v-else />
      </button>
      <button :disabled="loading"
        class="hover:bg-white transition-all duration-200 p-2 rounded-md items-center justify-center flex ">
        <div v-if="!loading" class="i-gg-profile text-xl cursor-pointer rounded-lg"></div>
        <LoadSpinner v-else />
      </button>
      <NBPopover></NBPopover>
    </div>

    <!--   
    <TestModalComponent></TestModalComponent>
    <ApiKeyManager />
    -->
    <NB2Modal :is-visible="ui.showKeyManager" @close="ui.showKeyManager = false">
      <ApiKeyManager />
    </NB2Modal>
    <NB2Modal :is-visible="ui.showSettings" @close="ui.showSettings = false">
      <Settings />
    </NB2Modal>
    <NB2Modal :is-visible="ui.showDebug" @close="ui.showDebug = false" :scrollable="true" :full-width="true">
      <Debug />
    </NB2Modal>

  </header>
</template>