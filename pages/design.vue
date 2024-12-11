<script setup lang="ts">
const keys = useApiKeyStore();
const prompt = ref('');
const generatedImage = ref<string | null>(null);
const temperature = ref(0.5);
const numImages = ref(1);
const isGenerating = ref(false);
// Adjust based on Dall-E parameters
const apiKey = computed(() => {
  return keys.mostRecentOpenAIKey ? keys.mostRecentOpenAIKey.apiKey : '';
})

async function generateMediaWithAI() {
  isGenerating.value = true;
  if (!apiKey.value) return;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.value}`
      },
      body: JSON.stringify({
        prompt: prompt.value,
        n: numImages.value,
        // temperature: temperature.value
      })
    });
    const data = await response.json();
    generatedImage.value = data.url;
  } catch (error) {
    console.error('Error generating image:', error);
  } finally {
    isGenerating.value = false;
  }
}

const gridGen = computed(() => {
  const grid = new Array(numImages.value).fill(null);
  return grid;
})

const gridGenStyle = computed(() => {
  return `grid-rows-${numImages.value}`;
})

</script>

<template>
  <aside class="p-2 flex flex-col bg-grey-1 pt-16 border-r-1 border-grey-3">
    <div class="mb-4">
      <label for="temperature" class="block text-gray-700">Temperature:</label>
      <input id="temperature" type="range" v-model="temperature" min="0" max="1" step="0.1" class="w-full" />
      <span class="text-gray-600">{{ temperature }}</span>
    </div>
    <div class="mb-4">
      <label for="numImages" class="block text-gray-700">Number of Images:</label>
      <input id="numImages" type="number" v-model="numImages" min="1" max="6" class="w-full" />
    </div>


  </aside>


  <main class="flex w-full flex-col items-center justify-center bg-orange-1">
    <div class="flex flex-col items-center justify-center w-full h-full">Data:
      <p>{{ generatedImage }}</p>
      <p>{{ apiKey }}</p>
      <p></p>
    </div>
    <section id=" images" class="flex flex-wrap gap-4 w-full h-full bg-yellow-100  justify-center">
      <div class="image-item bg-gray-800 w-full sm:max-w-1/4 sm:max-h-1/4 aspect-ratio-square min-h-36 rounded-lg"
        v-for="g in gridGen">
        <img v-if="generatedImage" :src="generatedImage" class="object-cover w-full h-full rounded-lg" />
      </div>
    </section>
    <hr>

    <form @submit.prevent="generateMediaWithAI" id="prompt" class="w-full bg-gray-1 p-4 rounded-lg">
      <textarea id="prompt" v-model="prompt" placeholder="Enter your prompt here..."
        class="w-full p-2 border rounded"></textarea>
      <div class="flex justify-between items-center mb-4">
        <button class="btn">Fake Button</button>
        <button type="submit" class="btn gradient text-white place-end">{{ isGenerating ? 'Generating...' :
          'GenerateImage' }}</button>
      </div>
      <!--      <NBButton text="Generate Media" @click="generateMediaWithAI" class="gradient px-4 py-2 text-white rounded-md">
      </NBButton> -->
    </form>
  </main>
</template>
<style scoped></style>