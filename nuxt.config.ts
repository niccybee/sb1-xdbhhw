import {
  createMarkdownParser,
  rehypeHighlight,
  createShikiHighlighter,
} from "@nuxtjs/mdc/runtime";
import { bundledLanguages, bundledThemes } from "shiki";
import MaterialThemePalenight from "shiki/themes/material-theme-palenight.mjs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt",
    "@unocss/nuxt",
    "@formkit/auto-animate/nuxt",
    "@nuxtjs/mdc",
  ],
  mdc: {
    highlight: {
      highlighter: "shiki",
      langs: ["ts", "vue", "vue-html", "html", "python"],
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
  components: ["~/components", "~/components/ui"],
});
