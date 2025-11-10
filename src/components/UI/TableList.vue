<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import ButtonAction from './ButtonAction.vue'
import LoadingView from './LoadingView.vue'

type Header = {
  key: string
  label: string
}

const props = defineProps<{
  headers: Header[]
  rows: Record<string, any>[]
  tableName: string
  isAction?: boolean
  onEdit?: (e: string) => void
  onDelete?: (e: string) => void
  isLoading?: boolean
  onCreate: () => void
  createName: string
}>()
</script>

<template>
  <div class="overflow-x-auto w-full flex flex-col gap-5">
    <div class="flex flex-row justify-between w-full">
      <span class="font-bold">{{ props.tableName }}</span>
      <ButtonAction @click="onCreate" class="bg-green-700! w-32! mb-5" :button-name="createName" />
    </div>
    <table class="table table-xs w-full">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="text-gray-600 py-3" v-for="(header, index) in props.headers" :key="index">
            {{ header.label }}
          </th>
          <th :v-if="props.isAction" class="text-gray-600 py-3">Action</th>
        </tr>
      </thead>

      <tbody v-if="props.rows.length > 0">
        <tr class="border-b border-gray-200" v-for="(row, rowIndex) in props.rows" :key="rowIndex">
          <td class="py-3" v-for="(header, colIndex) in props.headers" :key="colIndex">
            <!-- tampilkan gambar kalau key-nya image -->
            <template v-if="header.key === 'image'">
              <a
                :href="row[header.key]"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block"
              >
                <img
                  :src="row[header.key]"
                  :alt="`${row[header.key]} - ${rowIndex.toString()}`"
                  class="w-12 h-12 rounded-md hover:scale-105 transition-transform"
                  @error="(e) => ((e.target as HTMLImageElement).src = '/no-image.png')"
                />
              </a>
            </template>

            <!-- selain image, tampilkan teks biasa -->
            <template v-else>
              {{ row[header.key] }}
            </template>
          </td>
          <td :v-if="isAction" class="py-3 flex gap-2 items-center justify-center">
            <button
              class="text-yellow-600 cursor-pointer hover:underline"
              @click="props.onEdit && props.onEdit(row.id.toString())"
            >
              Edit
            </button>
            <button
              class="text-red-600 cursor-pointer hover:underline"
              @click="props.onDelete && props.onDelete(row.id.toString())"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-if="isLoading">
        <tr>
          <td class="py-5" :colspan="props.headers.length + (props.isAction ? 1 : 0)">
            <div class="flex justify-center items-center">
              <LoadingView class="text-black h-14! w-14!" />
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-if="props.rows.length === 0 && !isLoading">
        <tr>
          <td
            :colspan="props.headers.length + (props.isAction ? 1 : 0)"
            class="text-center text-gray-500 py-10"
          >
            No data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
