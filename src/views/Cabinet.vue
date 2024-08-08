<template>
  <div  class="flex h-screen">
    <ChatList />
    <ChatWindow />
    <button @click="toggleDarkMode" class="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded">
      Toggle Dark Mode
    </button>
  </div>
</template>

<script setup>
import {ref, onMounted, watch, inject} from 'vue';
import ChatList from '../components/ChatList.vue';
import ChatWindow from '../components/ChatWindow.vue';
import {useRoute} from "vue-router";

const isDarkMode = ref(false);
const route = useRoute();
const headToggleDarkMode = inject('$toggleDarkMode')
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  headToggleDarkMode(isDarkMode.value);
  localStorage.setItem('darkMode', isDarkMode.value);
};

  onMounted(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    if(savedDarkMode != null){
      isDarkMode.value = JSON.parse(savedDarkMode)
    }
  })

</script>

<style>
</style>
