import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import {generateText} from 'ai'

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  file?: File | null;
  created: Date;
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
    currentChat: (state) => {
      return state.chats.find((chat: Chat) => chat.id === state.currentChatId);
    },
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
        usageTotal: 0,
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
    async sendMessage(message: Message) {
      if (!this.currentChat) {
        this.createNewChat();
        
      }
      
      
      const userMessage: Message = {
        id: generateUUID(),
        role: "user",
        content: message.content,
        created: new Date(),
      }

      try {
        // call chat api and return result
        useFetch('api/chat', {
          method: 'POST',
          body: JSON.stringify({
            messages: this.currentChat.messages,
            provider: this.currentChat.provider,
            model: this.currentChat.model,
          }),
        })
      } catch (e) {
        console.error("Error generating text", e);
      } finally {
        await this.nameChat()
      }
      
    },
    async removeChat(id) {
      const index = this.chats.findIndex((chat) => chat.id === id);
      this.chats.splice(index, 1);
    },
    async cleanChats() {
      for (const chat of this.chats) {
        if (chat.messages.length === 0) {
          chat.messages = [];
        }
      }
    }
  },
});
