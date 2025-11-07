<script setup lang="ts">
import HeaderLayout from './HeaderLayout.vue'
import SidebarLayout from './SidebarLayout.vue'
</script>
<template>
  <div class="flex flex-row w-full">
    <SidebarLayout />
    <div class="w-full relative max-h-screen overflow-y-auto">
      <HeaderLayout />
      <main class="p-5">
        <slot />
      </main>
    </div>
  </div>
</template>
