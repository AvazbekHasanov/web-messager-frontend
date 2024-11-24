<template>
  <div class="w-1/3 bg-gray-100 dark:bg-gray-800 p-4">
    <h2 class="text-xl font-bold mb-4 text-black dark:text-white">Chat Buddies</h2>
    <div class="mb-4">
      <input type="text" placeholder="Search messages, people"
             class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
             v-model="username" @focus="startSearching" @input="debouncedSearch"/>
    </div>
    <div class="space-y-2">
<!--      <p>Salom {{ iterationChats.length }} </p>-->
      <div v-for="chat in iterationChats" :key="chat.id"
           class="p-2 rounded flex gap-2.5 flex-row hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" @click="selectChat(chat)">
        <div>
          <img src="../../public/img.png" style="border-radius: 50% ; width: 48px" v-if="!chat.photo">
        </div>
        <div>
          <p class="font-bold text-black dark:text-white">{{ chat.full_name ?? chat.username }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ chat.lastmessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch, getCurrentInstance, defineEmits} from 'vue';
import debounce from 'lodash/debounce';

const emit = defineEmits(['selectedChat'])
const {proxy} = getCurrentInstance()

const searchResult = ref([]);
const isSearchStarted = ref(false);
const chats = ref([]);

const iterationChats = ref([])
const selectedChat = ref({})
const username = ref(null)

const stoppedSearch = () => {
  isSearchStarted.value = false;
  iterationChats.value = chats.value
}
const startSearching = () => {
  isSearchStarted.value = true;
  iterationChats.value = searchResult.value;
};

const searchUser = async () => {
  if (username.value === '') return;

  try {
    const response = await proxy.$axios.get('find/user', {username: username.value})
    searchResult.value = response.result
    iterationChats.value = response.result;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};


const debouncedSearch = debounce(searchUser, 300);
const selectChat = (chat) => {
  // e.stopPropagation();
  selectedChat.value = chat
  emit('newChatSelected', {user_id: selectedChat.value.id, chat_id : selectedChat.value.chat_id??''});
};

watch(username, () => {
  debouncedSearch();
});

onMounted(async  function () {
  const response = await proxy.$axios.get('user/chat/list')
  iterationChats.value = response.chat_list;
})
</script>
