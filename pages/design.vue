<script setup lang="ts">
const prompt = ref('');
const generatedImage = ref<string | null>(null);
const temperature = ref(0.5);
const numImages = ref(1); // Adjust based on Dall-E parameters
const apiKey = ref('');

async function generateMediaWithAI() {
  if (!apiKey.value) return;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.value}`
      },
      body: JSON.stringify({
        model: "dall-e",
        prompt: prompt.value,
        n: numImages.value,
        temperature: temperature.value
      })
    });
    const data = await response.json();
    generatedImage.value = data.url;
  } catch (error) {
    console.error('Error generating image:', error);
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
  <aside class="p-2 flex flex-col bg-green-1 pt-16">
    <div class="mb-4">
      <label for="temperature" class="block text-gray-700">Temperature:</label>
      <input id="temperature" type="range" v-model="temperature" min="0" max="1" step="0.1" class="w-full" />
      <span class="text-gray-600">{{ temperature }}</span>
    </div>
    <div class="mb-4">
      <label for="numImages" class="block text-gray-700">Number of Images:</label>
      <input id="numImages" type="number" v-model="numImages" min="1" max="5" class="w-full" />
    </div>


  </aside>


  <main class="flex w-full flex-col items-center justify-center">
    <section id=" images" class="flex flex-wrap gap-4 w-full bg-yellow-100">
      <div class="image-item bg-gray-800  w-full sm:w-auto sm:max-w-1/3  min-w- min-h-36 rounded-lg" v-for="g in gridGen">
        I am an image
      </div>
    </section>
    <hr>

    <div id="prompt" class="w-full bg-yellow-100 p-4 rounded-lg">
      <textarea id="prompt" v-model="prompt" placeholder="Enter your prompt here..."
        class="w-full p-2 border rounded"></textarea>
      <!--      <NBButton text="Generate Media" @click="generateMediaWithAI" class="gradient px-4 py-2 text-white rounded-md">
      </NBButton> -->
    </div>
  </main>
</template>
<style scoped></style>