<script setup lang="ts">
import { useUIStore } from '~/stores/ui'

const ui = useUIStore()

const loading = ref(true);

onMounted(() => {
  loading.value = false;
})

</script>
<template>
  <header class=" p-4 flex items-center justify-between border-b border-gray-200">
    <div class="flex items-center">
      <div class="i-gg-band-aid hover:gradient transition duration-200 text-2xl mr-4"></div>
      <p>Bandaid AI</p>
    </div>
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
    <NB2Modal :is-visible="ui.showDebug" @close="ui.showDebug = false">
      <Debug />
    </NB2Modal>
    <NBPopover></NBPopover>
  </header>
</template>