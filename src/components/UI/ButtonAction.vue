<script setup lang="ts">
import LoadingView from './LoadingView.vue'

const props = defineProps<{
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  buttonName: string
  isLoading?: boolean
  onClick?: () => void
}>()
</script>

<template>
  <button
    :disabled="props.disabled"
    :type="props.type"
    :onclick="onClick"
    class="flex cursor-pointer w-full rounded-lg p-1 items-center justify-center bg-orange-600"
  >
    <span v-if="!props.isLoading" class="text-white">{{ props.buttonName }}</span>
    <span v-else class="flex items-center gap-2 text-white">
      <LoadingView class="text-white" />
      Loading...
    </span>
  </button>
</template>
