<script setup lang="ts">
</script>

<template>
  <div id="home" class="p-4">
    <section id="features" class="py-4">
      <h2 class="text-xl font-semibold mb-2">Features</h2>
      <p>Discover the amazing features of Bandad AI.</p>
      <div class="flex gap-3"> <nuxt-link to="/chat">
          <NBButton text="Start Chat" buttonType="gradient text-white mt-2 flex items-center" icon="i-gg-chevron-right" />
        </nuxt-link>

        <nuxt-link to="/design">
          <NBButton text="Create New Design" buttonType=" mt-2 flex items-center" icon="i-gg-bolt" />
        </nuxt-link>
      </div>
    </section>
  </div>
</template>