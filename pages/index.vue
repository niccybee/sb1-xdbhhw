<template>
  <div id="home" class="p-4">
    <header class="mb-4">
      <h1 class="text-2xl font-bold mb-2">Welcome to Bandad AI Chat Interface</h1>
    </header>
    <nav class="mb-6">
      <ul class="flex space-x-4">
        <li><a class="text-blue-500 hover:underline" href="/login">Login</a></li>
        <li><a class="text-blue-500 hover:underline" href="#features">Features</a></li>
      </ul>
    </nav>
    <section id="features" class="py-4">
      <h2 class="text-xl font-semibold mb-2">Features</h2>
      <p>Discover the amazing features of Bandad AI.</p>
      <nuxt-link to="/chat">
        <NBButton text="Get Started"  buttonType="gradient text-white mt-2 flex items-center" icon="i-gg-chevron-right"/>
      </nuxt-link>
    </section>
  </div>
</template>