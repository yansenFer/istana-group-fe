<script setup lang="ts">
import DashboardLayout from '@/components/Layout/DashboardLayout.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import InputField from '@/components/UI/InputField.vue'
</script>
<template>
  <DashboardLayout>
    <BaseCard>
      <div class="flex flex-row gap-3 w-full justify-between">
        <InputField name="Search" />
        <button>Search</button>
      </div>
    </BaseCard>
  </DashboardLayout>
</template>
