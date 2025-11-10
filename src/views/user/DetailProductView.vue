<script setup lang="ts">
import ShopLayout from '@/components/Layout/user/ShopLayout.vue';
import LoadingView from '@/components/UI/LoadingView.vue';
import router from '@/router';
import { getProduct } from '@/service/api/product.api';
import type { IProduct } from '@/types/IProduct';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const route = useRoute()
const paramId = route.params.id
const $toast = useToast()

const dataProduct = ref<IProduct>()
const isLoading = ref(true)

function handleBack() {
  router.replace({name: 'shop product'})
}

const fetchData = async () => {
  await getProduct(paramId?.toString())
    .then((res) => {
      if (res.status === 200) {
        dataProduct.value = res.data
      }
    })
    .catch((err) => $toast.error(err))
    .finally(() => (isLoading.value = false))
}

onMounted(fetchData)

</script>

<template>
  <ShopLayout v-if="!isLoading">
    <main class="flex flex-col px-3">
       <button
       @click="handleBack"
        className="mb-6 px-4 py-2 w-fit mt-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer transition-colors"
      >
        Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <img
            :src="dataProduct?.image"
            :alt="dataProduct?.title"
            className="w-full max-w-md h-auto rounded-lg bg-gray-100"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm text-gray-500 mb-2">{{dataProduct?.category}}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{{dataProduct?.title}}</h1>
          <p className="text-gray-600 text-lg mb-6">{{dataProduct?.description}}</p>

          <div className="mb-8">
            <p className="text-gray-600 text-sm mb-2">Price</p>
            <p className="text-5xl font-bold text-gray-900">{{dataProduct?.price}}</p>
          </div>

          <button
            className="w-full py-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  </ShopLayout>
  <div class="flex w-screen h-screen items-center justify-center" v-else>
      <LoadingView class="w-26! h-26!" />
  </div>
</template>
