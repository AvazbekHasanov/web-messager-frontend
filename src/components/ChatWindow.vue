<template>
  <div class="w-2/3 flex flex-col bg-white dark:bg-gray-900">
    <div class="flex-grow p-4 overflow-auto">
      <div class="flex justify-start mb-4" v-for="message in messages" :key="message.id" :class="{'justify-end': message.is_owner}">
        <div v-if="!message.is_owner" class="flex-shrink-0 w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full mr-2"></div>
        <div class=" bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p class="font-bold text-black dark:text-white">{{ message.from }}</p>
          <p class="text-black dark:text-white">{{ message.content }}</p>
        </div>
        <div v-if="message.is_owner" class="flex-shrink-0 ml-2 w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
   <ChatInput></ChatInput>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import ChatInput from './ChatInput.vue';

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


</script>

<style >
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
