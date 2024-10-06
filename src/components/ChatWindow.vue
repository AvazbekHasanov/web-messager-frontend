<template>
  <div class="w-2/3 flex flex-col bg-white dark:bg-gray-900">
    <div class="user_info">
      <div> <img src="../../public/svgs/cevron-left.svg" alt="none" class="w-5 cursor-pointer"></img> </div>
      <div>
        <img src="../../public/img.png" style="border-radius: 50% ; width: 48px" v-if="!selectedChatInfo.userData.photo">
      </div>
      <div class="dark:text-white">{{selectedChatInfo.userData.full_name}}</div>
    </div>
    <div class="flex-grow p-4 overflow-auto">
      <div v-if="selectedChatInfo.messages.length>0" class="flex justify-start mb-4" v-for="message in props.selectedChatInfo.messages" :key="message.id" :class="{'justify-end': message.is_owner}">
        <div v-if="!message.is_owner" class="flex-shrink-0 w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full mr-2"></div>
        <div class=" bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p class="font-bold text-black dark:text-white">{{ message.from }}</p>
          <p class="text-black dark:text-white">{{ message.content }}</p>
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
import {reactive, ref, defineProps, onMounted} from 'vue';
import ChatInput from './ChatInput.vue';

const props = defineProps({
  selectedChatInfo: { type: Object, required: true },
})



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

const sendMessage = (arg)=>{
  console.log("arg", arg)
}

onMounted(()=>{
  console.log("props", props.selectedChatInfo);
})
</script>

<style >
.free_content{
  @apply flex items-center justify-center dark:text-white w-full h-full
}
.user_info{
  @apply p-4 flex flex-row gap-4 items-center border-b-2
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
