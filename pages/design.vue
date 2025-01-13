
<script setup lang="ts">
import { AI_PROVIDERS } from '~/config/ai';
const { $toast } = useNuxtApp();
const keys = useApiKeyStore();
const prompt = ref('');
const generatedImages = ref<string[]>([]);
const temperature = ref(0.5);
const numImages = ref(1);
const isGenerating = ref(false);
const selectedProvider = ref('openai');
const ui = useUIStore();
const loading = ref(true);

const availableProviders = computed(() => {
  return Object.entries(AI_PROVIDERS)
    .filter(([provider]) => keys.keys.some(k => k.provider === provider))
    .map(([id, config]) => ({ id, name: config.name }));
});

const apiKey = computed(() => {
  const key = keys.keys.find(k => k.provider === selectedProvider.value);
  return key ? key.key : '';
});

async function generateMediaWithAI() {
  isGenerating.value = true;
  if (!apiKey.value) {
    $toast.error('API key is required');
    isGenerating.value = false;
    return;
  }

  try {
    const response = await $fetch('/api/design', {
      method: 'POST',
      body: {
        prompt: prompt.value,
        numImages: numImages.value,
        apiKey: apiKey.value
      }
    });

    if (!response.success) {
      throw new Error(response.error.message);
    }

    generatedImages.value = response.data.map((img: any) => img.url);
    $toast.success('Images generated successfully!');
  } catch (error: any) {
    console.error('Error generating image:', error);
    $toast.error(error.message || 'Failed to generate images');
    generatedImages.value = [];
  } finally {
    isGenerating.value = false;
  }
}
onMounted(() => {
  loading.value = false;
})
</script>

<template>
  <aside class="p-2 flex flex-col bg-grey-1 pt-16 border-r-1 border-grey-3">
    <div class="mb-4">
      <label class="block text-gray-700">Provider:</label>
      <select v-model="selectedProvider" class="w-full p-2 rounded border">
        <option v-for="provider in availableProviders" :key="provider.id" :value="provider.id">
          {{ provider.name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label for="temperature" class="block text-gray-700">Temperature:</label>
      <input id="temperature" type="range" v-model="temperature" min="0" max="1" step="0.1" class="w-full" />
      <span class="text-gray-600">{{ temperature }}</span>
    </div>
    <div class="mb-4">
      <label for="numImages" class="block text-gray-700">Number of Images:</label>
      <input id="numImages" type="number" v-model="numImages" min="1" max="10" class="w-full p-2 rounded border" />
    </div>
  </aside>

  <main class="flex w-full h-full flex-col items-center justify-center bg-orange-1 p-4 relative">
    <section id="images" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <div v-for="(image, index) in generatedImages" :key="index"
        class="image-item bg-gray-800 aspect-square rounded-lg overflow-hidden">
        <img v-if="image" :src="image" class="w-full h-full object-cover" />
      </div>
      <div v-if="!generatedImages.length" class="col-span-full text-center text-gray-500">
        No images generated yet
      </div>
    </section>

    <form @submit.prevent="generateMediaWithAI" class="border-1 bg-white border-gray-300 rounded-lg p-4 w-full"
      ref="chatForm shadow-1" :class="ui.engagedMessageMode ? 'fixed bottom-2 inset-x-1 w-full' : 'relative'">
      <div><input :disabled="loading" ref="chatInput" class="w-full rounded-lg border-1 border-gray-1 mb-1"
          v-model="prompt" :placeholder="loading ? 'Loading...' : 'Enter your prompt here...'" />
      </div>
      <div class="flex justify-end">
        <button type="submit" class="btn gradient text-white px-6 py-2 rounded" :disabled="isGenerating">
          {{ isGenerating ? 'Generating...' : 'Generate Images' }}
        </button>
      </div>
    </form>

  </main>
</template>

<style scoped>
.gradient {
  background: linear-gradient(to right, #4F46E5, #7C3AED);
}
</style>
