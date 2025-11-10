<script setup lang="ts">
import HeaderAdmin from './HeaderAdmin.vue'
import SidebarAdmin from './SidebarAdmin.vue'
</script>
<template>
  <div class="flex flex-row w-full">
    <SidebarAdmin />
    <div class="w-full relative max-h-screen overflow-y-auto">
      <HeaderAdmin />
      <main class="p-5 flex flex-col w-full gap-5">
        <slot />
      </main>
    </div>
  </div>
</template>
