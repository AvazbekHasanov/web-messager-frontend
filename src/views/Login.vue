<script setup>
import {RouterLink} from "vue-router";
import axios from "axios";
import {reactive, ref, getCurrentInstance} from "vue";
import router from "@/router/index.js";

const { proxy } = getCurrentInstance();


const username = reactive({
    value: "",
    noError: false,
    textError: null
})
const password = reactive({
    value: "",
    noError: false,
    textError: null
})

const isSaveUsername = ref(false)
const login = (e)=>{
  e.preventDefault();
  proxy.$axios.post('/auth/login', {password: password.value, username: username.value}).then(res=>{
    console.log('Access Token:', res.accessToken);

    localStorage.setItem('access_token', res.accessToken);
    localStorage.setItem('auth_user', JSON.stringify(res.userData))
    document.cookie = `access_token=${res.accessToken}`;
    router.push('/cabinet');
  }).catch(err=>{
    console.log("err", err.response.data)
  })
}

</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-10 w-auto" src="../../public/svgs/login.svg" alt="Workflow">
      <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900 dark:text-gray-100">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
        Or
        <RouterLink to="/auth/registration"
                    class="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
          create a new acccount
        </RouterLink>
      </p>
    </div>


    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-gray-800">
        <form @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm font-medium leading-5  text-gray-700 dark:text-gray-100">Email
              address</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input id="email" name="email" placeholder="user@example.com" type="email" required="" v-model="username.value" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5
dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <div class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <label for="password"
                   class="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-100">Password</label>
            <div class="mt-1 rounded-md shadow-sm">
              <input id="password" name="password" type="password" required="" v-model="password.value"
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
                               focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5
dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
          </div>

          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember_me" name="remember" type="checkbox" value="1" v-model="isSaveUsername"
                     class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900 dark:text-gray-100">Remember
                me</label>
            </div>

            <div class="text-sm leading-5">
              <a href="#"
                 class="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                Forgot your password?
              </a>
            </div>
          </div>

          <div class="mt-6">
                    <span class="block w-full rounded-md shadow-sm">
            <button type="submit"
                    @click="login"
                    class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              Sign in
            </button>
          </span>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
