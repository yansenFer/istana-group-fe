<script setup lang="ts">
import router from '@/router'
import Cookies from 'universal-cookie'

function handleLogout() {
  const cookies = new Cookies(null, { path: '/' })
  cookies.remove('auth', { path: '/' })
  router.replace({ name: 'login' })
}
</script>
<template>
  <header class="bg-white sticky top-0 shadow-sm h-14 flex">
    <div class="flex w-full justify-end mx-10">
      <button @click="handleLogout" class="hover:underline cursor-pointer">Logout</button>
    </div>
  </header>
</template>
