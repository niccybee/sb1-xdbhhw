// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "@unocss/nuxt"],
  unocss: {
    // UnoCSS options
  },
  css: ["@unocss/reset/tailwind.css"],
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  },
});
