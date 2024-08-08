<script >
import { RouterLink, RouterView } from 'vue-router'
import {inject, onMounted} from "vue";
export default {
  name: 'App',
  setup() {
    const toggleDarkMode = inject('$toggleDarkMode')
    onMounted(() => {
      const savedDarkMode = localStorage.getItem('darkMode')
        toggleDarkMode(savedDarkMode)
    })
  }
}
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
