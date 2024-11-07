import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  file?: File | null;
}

interface Chat {
  id: string;
  name: string;
  messages: Message[];
  provider: string;
  model: string;
}

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const useChatStore = defineStore("chat", {
  state: () => ({
    chats: useStorage("chats", []),
    currentChatId: useStorage("currentChatId", ""),
    selectedProvider: "openai",
    selectedModel: "gpt-3.5-turbo",
  }),
  getters: {
    currentChat: (state) =>
      state.chats.find((chat) => chat.id === state.currentChatId),
    currentMessages: (state): Message[] => state.currentChat?.messages || [],
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
    addMessage(message: Message) {
      if (!this.currentChat) {
        this.createNewChat();
      }
      if (this.currentChat.messages.length === 1) {
        this.nameChat();
      }
      this.currentChat?.messages.push(message);
    },
    async nameChat() {
      if (this.currentChat) {
        this.currentChat.name = this.currentChat.messages[0].content.splice(
          0,
          30,
        );
      }
    },
    async removeChat(id) {
      const index = this.chats.findIndex((chat) => chat.id === id);
      this.chats.splice(index, 1);
    },
  },
});
