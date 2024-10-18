import { defineStore } from "pinia";

export const useApiKeyStore = defineStore("apiKeys", {
  state: () => ({
    keys: [],
    apiKey: null,
  }),
  getters: {
    hasApiKey: (state) => !!state.apiKey,
  },
  actions: {
    async testApiKey(key, provider) {
      const providerName = provider.toLowerCase();
      const url =
        providerName === "openai"
          ? "/api/openai/test"
          : providerName === "anthropic"
            ? "/api/anthropic/test"
            : console.error("Invalid provider");

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${key}`,
          },
        });
        if (response.ok) {
          return true;
        } else {
          throw new Error("Invalid API key");
        }
      } catch (error) {
        console.error("Error testing API key:", error);
        throw error;
      } finally {
        console.error("Provided API key is valid");
      }
    },
    setApiKey(key) {
      let newKey = key;
      this.apiKey = newKey;
    },
  },
});
