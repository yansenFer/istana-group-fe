<script setup lang="ts">
import ShopLayout from '@/components/Layout/user/ShopLayout.vue';
import LoadingView from '@/components/UI/LoadingView.vue';
import router from '@/router';
import { getProduct } from '@/service/api/product.api';
import type { IProduct } from '@/types/IProduct';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toast-notification';

const dataProducts = ref<IProduct[]>([])
const isLoading = ref<boolean>(true)
const $toast = useToast()



function handleDetailProduct(product: IProduct) {
  router.push({name: 'shop product detail', params: {id: product.id.toString()}})
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

</script>
<template>
  <ShopLayout v-if="dataProducts.length > 0">
    <main class="px-10 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <div
          v-for="(product, index) in dataProducts"
          :key="product.id"
          @click="() => handleDetailProduct(product)"
          className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        >
          <img
            :src="product.image"
            :alt="`${product.title} - ${index}`"
            className="w-full h-[400px] object-contain bg-gray-100"
          />
          <div className="p-4 relative">
            <p className="text-xs text-gray-500 mb-1">{{product.category}}</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{{product.title}}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{{product.description}}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">{{product.price.toFixed(2)}}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </ShopLayout>
  <div class="flex w-screen h-screen items-center justify-center" v-else>
      <LoadingView class="w-26! h-26!" />
  </div>
</template>
