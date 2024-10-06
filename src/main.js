import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask';
import $axios from './axios.js'

const app = createApp(App)


app.config.warnHandler = () => {
  // Do nothing, effectively muting all warnings
};

const toggleDarkMode = (darkMode) => {
    if (darkMode !== null) {
        darkMode = JSON.parse(darkMode);
        let headEl = document.getElementById("app");
        if (darkMode) {
            headEl.classList.add('dark');
        } else if(headEl && !darkMode){
            headEl.classList.remove('dark');
        }else {
            headEl.classList.remove('dark');
        }

    }
}

app.provide('$toggleDarkMode', toggleDarkMode)
app.config.globalProperties.$axios = $axios;

app.use(createPinia())
app.use(router)
app.use(VueTheMask)

app.mount('#app')
