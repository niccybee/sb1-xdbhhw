import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  file?: File | null;
  created: Date;
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
  provider: string;
  model: string;
  usageTotal: number;
}

export const useChatStore = defineStore("chat", {
  state: () => ({
    chats: useStorage<Chat[]>("chats", []),
    currentChatId: useStorage<string>("currentChatId", ""),
    selectedProvider: useStorage<string>("selectedProvider", "openai"),
    selectedModel: useStorage<string>("selectedModel", "gpt-3.5-turbo"),
  }),

  getters: {
    currentChat: (state) =>
      state.chats.find((chat) => chat.id === state.currentChatId),
    currentMessages: (state) => state.currentChat?.messages || [],
  },

  actions: {
    createNewChat() {
      const newChat: Chat = {
        id: generateUUID(),
        name: `Chat ${this.chats.length + 1}`,
        messages: [],
        provider: this.selectedProvider,
        model: this.selectedModel,
        usageTotal: 0,
      };
      this.chats.push(newChat);
      this.currentChatId = newChat.id;
    },

    async sendMessage(message: Message) {
      if (!this.currentChat) {
        this.createNewChat();
      }

      const userMessage: Message = {
        id: generateUUID(),
        role: "user",
        content: message.content,
        created: new Date(),
      };

      this.currentChat?.messages.push(userMessage);

      try {
        await $fetch("/api/chat", {
          method: "POST",
          body: {
            messages: this.currentChat?.messages,
            provider: this.currentChat?.provider,
            model: this.currentChat?.model,
          },
        });
      } catch (e) {
        console.error("Error generating text", e);
      } finally {
        await this.nameChat();
      }
    },

    setCurrentChat(chatId: string) {
      if (chatId !== this.currentChatId) {
        this.currentChatId = chatId;
      }
    },

    addMessage(message: Message) {
      if (!this.currentChat) {
        this.createNewChat();
      }
      if (this.currentChat?.messages.length === 1) {
        this.nameChat();
      }
      this.currentChat?.messages.push(message);
    },

    async nameChat() {
      if (this.currentChat?.messages[0]) {
        this.currentChat.name = this.currentChat.messages[0].content.slice(
          0,
          30,
        );
      }
    },

    removeChat(id: string) {
      this.chats = this.chats.filter((chat) => chat.id !== id);
    },

    cleanChats() {
      this.chats = this.chats.filter((chat) => chat.messages.length > 0);
    },
  },
});

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
