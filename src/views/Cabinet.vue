<template>
  <div class="flex h-screen">
    <ChatList @newChatSelected="selectNewChat" />
    <ChatWindow :selectedChatInfo="selectedChatInfo" />
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


import { createSocket } from "@/services/socket.js";

const socket = createSocket();
const userStore = useUserStore()


const isDarkMode = ref(false);
const route = useRoute();
const { proxy } = getCurrentInstance();
const headToggleDarkMode = inject("$toggleDarkMode");
const selectedChatInfo = reactive({
  userData: {},
  messages: [
    {
      id: 1,
      is_owner: false,
      from: "Grace Miller",
      content: "Hi Jack! I'm doing well, thanks. Can't wait for the weekend!",
    }
  ],
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  headToggleDarkMode(isDarkMode.value);
  localStorage.setItem("darkMode", isDarkMode.value);
};

const selectNewChat = (chatInfo) => {
  if (chatInfo.user_id || chatInfo.chat_id) {
    try {
      proxy.$axios
        .get("/chat/start/conversation/" + chatInfo.chat_id, {
          user_id: chatInfo.user_id,
        })
        .then((response) => {
          selectedChatInfo.messages = response.messages;
          selectedChatInfo.userData = response.chatInfo;
        });
    } catch (er) {
      console.log(er.response);
    }
  }
};

const socketLister = () => {
  socket.on("message", (data) => {
    console.log("Received message:", data);
  });
  const user = userStore.getUser
  socket.emit('connectedNewUser', user);
};
  
onMounted( async() => {

  const savedDarkMode = localStorage.getItem("darkMode");
  if (savedDarkMode != null) {
    isDarkMode.value = JSON.parse(savedDarkMode);
  }
await userStore.setters('test', JSON.parse(localStorage.getItem('auth_user')), true);

  socketLister();
});
</script>

<style></style>
