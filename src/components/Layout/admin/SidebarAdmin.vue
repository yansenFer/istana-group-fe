<script setup lang="ts">
import { useRoute } from 'vue-router';

const router = useRoute()
const name = router.name
const sidebarList = [
  {
    name: 'User',
    path: '/user',
    icon: 'pi pi-user',
  },
  {
    name: 'Product',
    path: '/product',
    icon: 'pi pi-list',
  },
]
</script>
<template>
  <aside class="bg-white self-start shadow-sm border h-screen w-64 min-w-64 border-gray-200 p-4">
    <RouterLink to="/" class="font-bold bg-transparent! px-3 w-full flex cursor-pointer"
      >Technical Test FE</RouterLink
    >
    <nav class="mt-7 flex flex-col gap-1 w-full">
      <RouterLink
        :to="list.path"
        v-for="list in sidebarList"
        :key="list.path"
        class="flex hover:bg-orange-600! flex-row gap-3 hover:text-white text-gray-600 items-center cursor-pointer transition-all duration-150 px-3 py-2 rounded-xl"
        :class="name!.toString().includes(list.name.toLowerCase()) ? 'bg-orange-600 text-white' : 'bg-transparent'"
      >
        <span :class="list.icon" />
        <span>{{ list.name }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>
