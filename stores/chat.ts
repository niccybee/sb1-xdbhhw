import { defineStore } from "pinia";
import { useApiKeyStore } from "./apiKeys";
import { useLocalStorage, useStorage } from "@vueuse/core";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const useChatStore = defineStore("chat", {
  state: () => ({
    chats: useStorage("chats", []),
    currentChatId: useStorage("currentChatId", null),
    selectedProvider: "openai",
    selectedModel: "gpt-3.5-turbo",
  }),
  getters: {
    currentChat: (state) =>
      state.chats.find((chat) => chat.id === state.currentChatId),
  },
  actions: {
    createNewChat() {
      const newChat = {
        id: generateUUID(),
        name: `Chat ${this.chats.length + 1}`,
        messages: [],
        provider: this.selectedProvider,
        model: this.selectedModel,
      };
      this.chats.push(newChat);
      this.currentChatId = newChat.id;
    },
    setCurrentChat(chatId) {
      this.currentChatId = chatId;
    },
    async nameChat(chatId, name) {},
    async sendMessage(content, provider, model, file = null) {
      if (!this.currentChat) {
        this.createNewChat();
      }

      this.currentChat.messages.push({
        id: generateUUID(),
        role: "user",
        content,
        file,
      });

      const apiKeyStore = useApiKeyStore();

      try {
        const response = await $fetch("/api/chat", {
          method: "POST",
          body: { message: content, provider, model, file },
          apiKey: apiKeyStore.apiKey,
        });

        this.currentChat.messages.push({
          id: generateUUID(),
          role: "assistant",
          content: response.message,
        });
      } catch (error) {
        console.error("Error sending message:", error);
        // Handle error (e.g., show error message to user)
      }
    },
  },
});
