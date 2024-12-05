// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@pinia/nuxt",
    "@unocss/nuxt",
    "@formkit/auto-animate/nuxt",
    "@nuxtjs/mdc",
    // "radix-vue/nuxt",
  ],
  mdc: {
    highlight: {
      highlighter: "shiki",
      langs: ["ts", "vue", "vue-html", "html", "python", "bash"],
      theme: "github-light",
    },
  },
  unocss: {
    // UnoCSS options
  },
  css: ["@unocss/reset/tailwind.css"],
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  },
  components: ["~/components", "~/components/ui", "~/components/global"],
  routeRules: {
    "/": { prerender: true },
  },
  // vite: {
  //   server: {
  //     hmr: {
  //       protocol: "wss",
  //       clientPort: 443,
  //     },
  //   },
  // },
  // nitro: {
  //   devProxy: {
  //     "/ws": "wss:/localhost:3000/",
  //   },
  // },
});
