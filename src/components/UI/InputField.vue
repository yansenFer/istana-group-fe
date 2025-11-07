<script setup lang="ts">
import { useField } from 'vee-validate'
import { defineProps } from 'vue'

interface Props {
  name: string
  type?: string
  labelName?: string
  placeholder?: string
}

const props = defineProps<Props>()

// register field ke vee-validate
const { value, errorMessage, meta } = useField(props.name)
</script>

<template>
  <div class="w-full flex flex-col">
    <label class="mb-1 font-medium text-sm text-gray-800">
      {{ props.labelName }}
    </label>
    <input
      v-model="value"
      :type="props.type || 'text'"
      :placeholder="props.placeholder"
      class="p-3 border transition-all h-8 duration-150 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-600 focus:ring-orange-600"
    />
    <span v-if="meta.touched && errorMessage" class="text-red-500 text-sm mt-1">
      {{ errorMessage }}
    </span>
  </div>
</template>
