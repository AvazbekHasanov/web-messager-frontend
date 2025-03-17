<template>
  <div class="flex h-screen">
    <ChatList @newChatSelected="selectNewChat" />
    <ChatWindow  />
    <button
      @click="toggleDarkMode"
      class="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded"
    >
      Toggle Dark Mode
    </button>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  watch,
  inject,
  reactive,
  getCurrentInstance,
} from "vue";
import ChatList from "../components/ChatList.vue";
import ChatWindow from "../components/ChatWindow.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userData";
import pusherService from "@/services/pusherService.js";
import { useCurrentChatStore } from '@/stores/CurrentChat.js';


const userStore = useUserStore();
const chatStore = useCurrentChatStore();

const isDarkMode = ref(false);
const route = useRoute();
const isLoaded = ref(false);
const { proxy } = getCurrentInstance();
const headToggleDarkMode = inject("$toggleDarkMode");

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  headToggleDarkMode(isDarkMode.value);
  localStorage.setItem("darkMode", isDarkMode.value);
};

const selectNewChat = (chatInfo) => {
  if (chatInfo.user_id || chatInfo.chat_id) {
    isLoaded.value = false;
    try {
      proxy.$axios
        .get("/chat/start/conversation/" + chatInfo.chat_id, {
          user_id: chatInfo.user_id,
        })
        .then((response) => {
          chatStore.setChatInfo(response.chatInfo);
          chatStore.setMessages(response.messages);
          isLoaded.value = true;
          // selectedChatInfo.messages = response.messages;
          // chatInfo = response.chatInfo;
          localStorage.setItem('selected_chat', response.chatInfo.chat_id)
        });
    } catch (er) {
      console.log(er.response);
      isLoaded.value = false;
    }
  }
};

const connectToPusher = async () => {
  try {
    pusherService.initPusher("404a7728d9df124f4ade", "ap2");
    const user = userStore.getUser;
    const channelName = `user_${user.id}`;
    const channel = pusherService.subscribeToChannel(channelName);

    // Log connection states
    pusherService.pusher.connection.bind("connected", () => {
      let data = {user_id: user.id, state: 'ONLINE'};
      proxy.$axios.post('/change/state', data).then(response=>{
      console.log("user connected", response, "import.meta.env.VITE_API_BASE_URL", import.meta.env.VITE_API_BASE_URL);
      })
      console.log("Pusher connected successfully");
    });

    pusherService.pusher.connection.bind("disconnected", () => {
      let data = {user_id: user.id, state: 'OFFLINE'};
      proxy.$axios.post('/change/state', data).then(response=>{
        console.log("user disconnected",response)
      })      
      console.log("Pusher disconnected");
    });

    pusherService.pusher.connection.bind("state_change", (states) => {
      console.log(`State changed from ${states.previous} to ${states.current}`);
    });

    // Bind to the "new-message" event
    pusherService.bindEvent("new-chat-message", (data) => {
      let message = {...data.data}
      const chatInfo = chatStore.getChatInfo;
      message.is_owner = false
      if(message.chat_id === chatInfo.chat_id){
        console.log("Received new message:", message);
        chatStore.addMessage(message)
        // selectedChatInfo.messages.push(message);
      }
      
    });

     pusherService.bindEvent("message-read", (data) => {
      const chatInfo = chatStore.getChatInfo;
      let messageId = data.message_id;
      if(chatInfo.chat_id == data.chat_id){
        chatStore.markAsRead(messageId)
      }

    });

  } catch (error) {
    console.error("Error connecting to Pusher:", error);
  }
};

const chatInfo = chatStore.getChatInfo;
const messages = chatStore.getMessages;
onMounted(async () => {
  const savedDarkMode = localStorage.getItem("darkMode");
  const chat_id = localStorage.getItem('selected_chat')
  if(chat_id){
    selectNewChat({chat_id:chat_id})
  }
  if (savedDarkMode != null) {
    isDarkMode.value = JSON.parse(savedDarkMode);
  }
  await userStore.setters(
    "test",
    JSON.parse(localStorage.getItem("auth_user")),
    true
  );
  await connectToPusher()

window.addEventListener("beforeunload", () => {
  const data = { user_id: 94, state: "OFFLINE" };
  navigator.sendBeacon(`${import.meta.env.VITE_API_BASE_URL}/change/state`, JSON.stringify(data));
});



});
</script>

<style></style>
