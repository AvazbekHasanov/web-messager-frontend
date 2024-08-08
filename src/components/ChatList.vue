<template>
  <div class="w-1/3 bg-gray-100 dark:bg-gray-800 p-4">
    <h2 class="text-xl font-bold mb-4 text-black dark:text-white">Chat Buddies</h2>
    <div class="mb-4">
      <input type="text" placeholder="Search messages, people" class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
    </div>
    <div class="space-y-2">
      <div v-for="chat in chats" :key="chat.id" class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" @click="selectChat(chat)">
        <p class="font-bold text-black dark:text-white">{{ chat.name }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ chat.lastMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const chats = ref([
  { id: 1, name: 'Grace Miller', lastMessage: "Can't wait for the weekend!" },
  { id: 2, name: 'Liam Anderson', lastMessage: 'Hey, how’s it going?' },
  { id: 3, name: 'Lucas Williams', lastMessage: 'Hi Jack! I\'m doing well, thanks. Can\'t wait for the weekend!' },
  { id: 4, name: 'Sophia Chen', lastMessage: 'Remember that concert last y...' },
  { id: 5, name: 'Benjamin Knight', lastMessage: 'Just got back from a hiking trip!' },
  { id: 6, name: 'Olivia Foster', lastMessage: 'Excited for the upcoming vac...' },
  { id: 7, name: 'Jackson Adams', lastMessage: 'Looking forward to the weekend...' },
  { id: 8, name: 'Ethan Sullivan', lastMessage: 'Finished reading a captivatin...' },
]);

const selectChat = (chat) => {
  console.log(chat.name);
};
</script>
