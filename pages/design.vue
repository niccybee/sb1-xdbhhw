
<script setup lang="ts">
import { AI_PROVIDERS } from '~/config/ai';
const keys = useApiKeyStore();
const prompt = ref('');
const generatedImages = ref<string[]>([]);
const temperature = ref(0.5);
const numImages = ref(1);
const isGenerating = ref(false);
const selectedProvider = ref('openai');

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
  console.log('generating image')
  isGenerating.value = true;
  if (!apiKey.value) return;

  try {
    console.log('init request')
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.value}`
      },
      body: JSON.stringify({
        prompt: prompt.value,
        n: numImages.value,
        size: "1024x1024"
      })
    });
    console.log('response image', response)
    const data = await response.json();
    if (data.error) {
      console.error('API Error:', data.error);
      return;
    }
    if (data.data && Array.isArray(data.data)) {
      generatedImages.value = data.data.map((img: any) => img.url);
    } else {
      console.error('Unexpected API response format:', data);
    }
  } catch (error) {
    console.error('Error generating image:', error);
  } finally {
    isGenerating.value = false;
  }
}
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

  <main class="flex w-full flex-col items-center justify-center bg-orange-1 p-4">
    <section id="images" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <div v-for="(image, index) in generatedImages" :key="index"
        class="image-item bg-gray-800 aspect-square rounded-lg overflow-hidden">
        <img v-if="image" :src="image" class="w-full h-full object-cover" />
      </div>
      <div v-if="!generatedImages.length" class="col-span-full text-center text-gray-500">
        No images generated yet
      </div>
    </section>

    <form @submit.prevent="generateMediaWithAI" class="w-full mt-4 bg-gray-1 p-4 rounded-lg">
      <textarea v-model="prompt" placeholder="Enter your prompt here..." class="w-full p-2 border rounded mb-4"
        rows="3"></textarea>
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
