<script setup>
import Logo from "@/components/icons/Logo.vue";
import UzbIcon from "@/components/icons/uzb-icon.vue";
</script>

<template>
  <div class="messenger-lending-container">
    <header class="main-page-header">
      <Logo></Logo>
      <nav class="nav-secondary-links">
        <a href="#">Asosiy</a>
        <a href="#">Xizmatlar</a>
        <a href="#">Xususiyatlar</a>
        <a href="#">Afzalliklar</a>
      </nav>
      <div>
        <uzb-icon/>
      </div>
          <div class="tumbler-wrapper">
      <div class="tumbler"></div>

    </div>
      <div>
        <button class="enter-in-system">Login/Registration </button>
      </div>
    </header>
  </div>
</template>

<style scoped>
.messenger-lending-container {
  @apply min-h-screen bg-gray-50 dark:bg-gray-800 flex flex-col items-center py-12 sm:px-6 lg:px-8 px-6;
  color: #1a1a1a;
}

.main-page-header {
  @apply flex flex-row justify-between gap-4;
  width: 85vw;
}

.nav-secondary-links {
  gap: 16px;
  border-radius: 99px !important;
  padding: 10px 20px;
  width: 400px;
  color: #ffffff;
  @apply flex flex-row justify-between gap-4 items-center bg-white   shadow dark:bg-gray-700;
}

.nav-secondary-links a {
  color: #1a1a1a;

  @apply dark:text-white;
}

.nav-secondary-links a:hover {
    font-weight: bold;
    border-bottom: 3px solid #528a4b;
}

.enter-in-system{
  padding: 20px 64px 20px 64px;
  gap: 10px;
  border-radius: 99px;
  border: 1px solid white!important;
  border: 1px;
  @apply dark:text-white shadow
}
</style>
