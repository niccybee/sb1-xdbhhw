import { defineStore } from "pinia";
import { useLocalStorage, useStorage } from "@vueuse/core";
import { useChatStore } from "~/stores/chat";

const chat = useChatStore();

interface Key {
  provider: string;
  key: string;
}

export const useApiKeyStore = defineStore("apiKeys", {
  state: () => ({
    keys: useStorage<Key[]>("keys", []),
    apiKey: useStorage<Key>("apiKey", { provider: "", key: "" }),
  }),
  getters: {
    activeApiKey: (state) => {
      if (!chat.currentChat) return "";
      chat.currentChat.value.provider = state.keys[0].provider;
    },
    hasApiKey: (state) => !!state.apiKey.key,
    mostRecentOpenAIKey: (state) => state.keys.find((k) => k.provider === "openai"),
  },
  actions: {
    addNewKey(key: Key) {
      let id = this.keys.length;
      this.keys.push(key);
    },
    setApiKey(key: Key) {
      let newKey = key;
      this.apiKey = newKey;
    },
    removeApiKey(key: Key) {
      this.keys = this.keys.filter((k) => k.key !== key.key);
    },
  },
});

// async testApiKey(key, provider) {
//   const providerName = provider.toLowerCase();
//   const url =
//     providerName === "openai"
//       ? "/api/openai/test"
//       : providerName === "anthropic"
//         ? "/api/anthropic/test"
//         : console.error("Invalid provider");

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${key}`,
//       },
//     });
//     if (response.ok) {
//       return true;
//     } else {
//       throw new Error("Invalid API key");
//     }
//   } catch (error) {
//     console.error("Error testing API key:", error);
//     throw error;
//   } finally {
//     console.error("Provided API key is valid");
//   }
// },
