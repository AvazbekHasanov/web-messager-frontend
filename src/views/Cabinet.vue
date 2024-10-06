<template>
  <div  class="flex h-screen">
    <ChatList  @newChatSelected="selectNewChat"/>
    <ChatWindow :selectedChatInfo="selectedChatInfo"/>
    <button @click="toggleDarkMode" class="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded">
      Toggle Dark Mode
    </button>
  </div>
</template>

<script setup>
import {ref, onMounted, watch, inject, reactive, getCurrentInstance} from 'vue';
import ChatList from '../components/ChatList.vue';
import ChatWindow from '../components/ChatWindow.vue';
import {useRoute} from "vue-router";

const isDarkMode = ref(false);
const route = useRoute();
const {proxy} = getCurrentInstance();
const headToggleDarkMode = inject('$toggleDarkMode')
const selectedChatInfo = reactive({
  userData: {},
  messages: [
  { id: 1, is_owner: false ,from: 'Grace Miller', content: 'Hi Jack! I\'m doing well, thanks. Can\'t wait for the weekend!' },
  { id: 2, is_owner: true ,from: 'Jack Raymonds', content: 'I know, right? Weekend plans are the best. Any exciting plans on your end?' },
  { id: 3, is_owner: false ,from: 'Grace Miller', content: 'Absolutely! I\'m thinking of going for a hike on Saturday. How about you?' },
  { id: 4, is_owner: true ,from: 'Jack Raymonds', content: 'Hiking sounds amazing! I might catch up on some reading and also meet up with a few friends on Sunday.' },
  { id: 5, is_owner: false ,from: 'Grace Miller', content: 'That sounds like a great plan! Excited 😃' },
  { id: 6, is_owner: true,from: 'Jack Raymonds', content: 'Can\'t wait for the weekend!' },
    { id: 1, is_owner: false ,from: 'Grace Miller', content: 'Hi Jack! I\'m doing well, thanks. Can\'t wait for the weekend!' },
  { id: 2, is_owner: true ,from: 'Jack Raymonds', content: 'I know, right? Weekend plans are the best. Any exciting plans on your end?' },
  { id: 3, is_owner: false ,from: 'Grace Miller', content: 'Absolutely! I\'m thinking of going for a hike on Saturday. How about you?' },
  { id: 4, is_owner: true ,from: 'Jack Raymonds', content: 'Hiking sounds amazing! I might catch up on some reading and also meet up with a few friends on Sunday.' },
  { id: 5, is_owner: false ,from: 'Grace Miller', content: 'That sounds like a great plan! Excited 😃' },
  { id: 6, is_owner: true,from: 'Jack Raymonds', content: 'Can\'t wait for the weekend!' },
]
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  headToggleDarkMode(isDarkMode.value);
  localStorage.setItem('darkMode', isDarkMode.value);
};

const selectNewChat = (chatInfo)=>{
  console.log("chatInfo", chatInfo);
  if (chatInfo.user_id || chatInfo.chat_id) {
    try {
     proxy.$axios.get('/api/chat/start/conversation/' + chatInfo.chat_id, {user_id: chatInfo.user_id}).then((response) => {
       selectedChatInfo.messages = response.messages
       selectedChatInfo.userData = response.chatInfo
    })
    }catch (er){
      console.log(er.response)
    }
  }
}

  onMounted(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    if(savedDarkMode != null){
      isDarkMode.value = JSON.parse(savedDarkMode)
    }
  })

</script>

<style>
</style>
