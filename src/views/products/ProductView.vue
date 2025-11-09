<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import DashboardLayout from '@/components/Layout/DashboardLayout.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import TableList from '@/components/UI/TableList.vue'
import router from '@/router'
import { deleteProduct, getProduct } from '@/service/api/product.api'
import type { IProduct } from '@/types/IProduct'
import { computed } from '@vue/reactivity'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'

const dataProducts = ref<IProduct[]>([])
const isLoading = ref<boolean>(true)
const $toast = useToast()

function routeForm(type: 'create' | 'edit', id?: string) {
  if (type === 'create') return router.push({ name: 'create product', query: { type } })
  if(type === "edit") return router.push({name: 'edit product', params: {id}})
}

const showAlert = (id: string) => {
  if (confirm(`Apakah kamu yakin ingin menghapus data ini dengan id ${id}?`)) {
    deleteList(id)
  }
}

async function deleteList(id: string) {
  await deleteProduct(id).then((res) => {
    if (res.status === 200) {
      fetchData()
      $toast.success(`Delete ${id} success`)
    }
  })
}

const fetchData = async () => {
  await getProduct()
    .then((res) => {
      if (res.status === 200) {
        dataProducts.value = res.data
      }
    })
    .catch((err) => $toast.error(err))
    .finally(() => (isLoading.value = false))
}

onMounted(fetchData)

const headers = [
  { key: 'id', label: 'Id' },
  { key: 'image', label: 'Image' },
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'description', label: 'Description' },
  { key: 'rating', label: 'Rating' },
  { key: 'price', label: 'Price' },

]

const rows = computed(() =>
  dataProducts.value.map((product) => ({
    id: product.id,
    image: product.image,
    title: product.title,
    category: product.category,
    description: product.description,
    rating: product.rating.rate,
    price: product.price
  })),
)
</script>

<template>
  <DashboardLayout>
    <BaseCard>
      <div class="flex flex-col w-full">
        <TableList
          create-name="Create Product"
          :onDelete="(e) => showAlert(e)"
          :onEdit="(e) => routeForm('edit', e)"
          :is-action="true"
          table-name="List Products"
          :headers="headers"
          :rows="rows"
          :is-loading="isLoading"
          :onCreate="() => routeForm('create')"
        />
      </div>
    </BaseCard>
  </DashboardLayout>
</template>
