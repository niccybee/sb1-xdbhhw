import { defineStore } from 'pinia';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    chats: [],
    currentChatId: null
  }),
  getters: {
    currentChat: (state) => state.chats.find(chat => chat.id === state.currentChatId)
  },
  actions: {
    createNewChat() {
      const newChat = {
        id: generateUUID(),
        name: `Chat ${this.chats.length + 1}`,
        messages: []
      };
      this.chats.push(newChat);
      this.currentChatId = newChat.id;
    },
    setCurrentChat(chatId) {
      this.currentChatId = chatId;
    },
    async sendMessage(content, provider, model, file = null) {
      if (!this.currentChat) {
        this.createNewChat();
      }

      this.currentChat.messages.push({
        id: generateUUID(),
        role: 'user',
        content,
        file
      });

      try {
        const response = await $fetch('/api/chat', {
          method: 'POST',
          body: { message: content, provider, model, file }
        });

        this.currentChat.messages.push({
          id: generateUUID(),
          role: 'assistant',
          content: response.message
        });
      } catch (error) {
        console.error('Error sending message:', error);
        // Handle error (e.g., show error message to user)
      }
    }
  }
});