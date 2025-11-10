<script setup lang="ts">
import HeaderShop from './HeaderShop.vue';

</script>

<template>
    <div class="flex flex-col w-full">
      <HeaderShop/>
      <slot />
    </div>
</template>
