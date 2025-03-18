import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentChatStore = defineStore("currentChat", {
  state: () => ({
    chatInfo: {
      full_name: "",
      photo: null,
      chat_id: null,
    },
    messages: ref([]),
  }),
  getters: {
    getChatInfo: (state) => state.chatInfo,
    getMessages: (state) => [...state.messages],
    getUnreadCount: (state) =>
      state.messages.filter((msg) => !msg.is_read).length,
  },
  actions: {
    setChatInfo(chatInfo) {
      this.chatInfo = chatInfo;
    },
    setMessages(messages) {
      this.messages = messages;
    },
    addMessage(message) {
      this.messages.push(message);
      this.messages = [...this.messages]; 
      console.log("Message added to currentChatstore:", message);
    },
    markAsRead(messageId) {
      const messageIndex = this.messages.findIndex(
        (msg) => msg.id === messageId
      );
      if (messageIndex !== -1) {
        this.messages[messageIndex].is_read = true;
        this.messages = [...this.messages]; // Replace array reference
      }
    },
    resetChat() {
      this.chatInfo = {
        full_name: "",
        photo: null,
        chat_id: null,
      };
      this.messages = [];
    },
  },
});
