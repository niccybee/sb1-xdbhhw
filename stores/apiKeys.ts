
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useChatStore } from "~/stores/chat";

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
    activeApiKey(): string {
      const chat = useChatStore();
      return chat.currentChat?.provider === this.keys[0]?.provider ? this.keys[0]?.key : "";
    },
    hasApiKey(): boolean {
      return !!this.apiKey.key;
    },
    mostRecentOpenAIKey(): Key | undefined {
      return this.keys.find((k) => k.provider === "openai");
    },
  },
  
  actions: {
    addNewKey(key: Key) {
      this.keys.push(key);
    },
    setApiKey(key: Key) {
      this.apiKey = key;
    },
    removeApiKey(key: Key) {
      this.keys = this.keys.filter((k) => k.key !== key.key);
    },
  },
});
