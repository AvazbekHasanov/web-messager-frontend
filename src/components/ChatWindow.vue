<template>
  <div class="w-2/3 flex flex-col bg-white dark:bg-gray-900">
    <div class="user_info">
      <div> <img src="../../public/svgs/cevron-left.svg" alt="none" class="back_icon" /> </div>
      <div>
        <img src="../../public/img.png" style="border-radius: 50% ; width: 48px" v-if="!selectedChatInfo.userData.photo">
      </div>
      <div class="dark:text-white">{{selectedChatInfo.userData.full_name}}</div>
    </div>
    <div class="flex-grow p-4 overflow-auto" ref="messagesContainer">
      <div v-if="selectedChatInfo.messages.length>0" class="flex justify-start mb-4" v-for="message in props.selectedChatInfo.messages" :key="message.id" :class="{'justify-end': message.is_owner}">
        <div v-if="!message.is_owner" class="flex-shrink-0 w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full mr-2"></div>
        <div class=" bg-white dark:bg-gray-800 rounded shadow "  style="padding: 5px 20px">
          <p class="font-bold text-black dark:text-white">{{ message.from }}</p>
 <media-container :files="message.files" :is_modal="false"/>

          <p class="text-black dark:text-white" v-html="formatTextWithBr(message.content)" v-if="message.content"></p>

        </div>
        <div v-if="message.is_owner" class="flex-shrink-0 ml-2 w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
      <div v-else class="free_content">
        No message here yet..
        Start chatting
      </div>
    </div>
   <ChatInput @sendMessage="sendMessage"></ChatInput>
  </div>
</template>

<script setup>
import {ref, defineProps, onMounted, getCurrentInstance, watch, nextTick} from 'vue';
import ChatInput from './ChatInput.vue';
import MediaContainer from "@/components/mediaContainer.vue";

import { createSocket } from "@/services/socket.js";

const socket = createSocket();

const props = defineProps({
  selectedChatInfo: { type: Object, required: true },
})

const {proxy} = getCurrentInstance();




const messages = ref([
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
]);
const messagesContainer = ref(null);

const sendMessage = async (arg)=>{
  let data = {
    message: arg.text,
    chat_id:props.selectedChatInfo.userData.chat_id
  }
   const result =  await proxy.$axios.post('/message/new/message',data);
  props.selectedChatInfo.messages.push(result.data);
  socket.emit('newMessageSend', result.data);
  scrollToBottom()
}

const formatTextWithBr = (text ,to='<br>', from = '\n')=>{
  return text.replace(from, to);
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    });
  }
}

watch(props.selectedChatInfo, (first, second) => {
  nextTick(() => {
    scrollToBottom(); // Ensures DOM is updated before scrolling
  })
})
onMounted(()=>{
  scrollToBottom();
  socket.on("newMessage", (data) => {
      console.log("New message received:", data);
  });
})
</script>

<style >
.free_content{
  @apply flex items-center justify-center dark:text-white w-full h-full
}
.user_info{
  @apply p-4 flex flex-row gap-4 items-center border-b-2
}


.back_icon {
  fill: #000;
  cursor: pointer;
}

@media (prefers-color-scheme: dark) {
  .back_icon {
    fill: #fff; /* Change to white (or any color) in dark mode */
  }
}
.back_icon path {
   color: #f1f1f1;
}

::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}

</style>
