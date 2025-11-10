<script setup lang="ts">
import ShopLayout from '@/components/Layout/user/ShopLayout.vue'
import router from '@/router'
import { useCartStore } from '@/stores/cart'
import type { IProduct } from '@/types'

const cart = useCartStore()

function handleBack() {
  router.replace({ name: 'shop product' })
}

function handleAdd(data: IProduct) {
  cart.addToCart(data)
}

function handleRemove(data: IProduct) {
  cart.removeFromCart(data.id)
}

function handleRemoveItem(data: IProduct) {
  cart.removeItem(data)
}
</script>

<template>
  <ShopLayout>
    <div v-if="cart.items.length > 0" class="mx-3">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="space-y-4">
            <div
              v-for="(cart, index) in cart.items"
              :key="cart.id"
              class="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg"
            >
              <img
                :src="cart.products.image"
                :alt="`${cart.products.title} - ${index}`"
                class="w-24 h-24 object-cover rounded bg-gray-100"
              />
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">{{ cart.products.title }}</h3>
                <p class="text-gray-600 text-sm mb-3">{{ cart.products.price }}</p>

                <div class="flex items-center gap-2 mb-3">
                  <button
                    @click="() => handleRemove(cart.products)"
                    class="w-8 h-8 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                  >
                    −
                  </button>
                  <span class="w-8 text-center">{{ cart.qty }}</span>
                  <button
                    @click="() => handleAdd(cart.products)"
                    class="w-8 h-8 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-gray-900 mb-3">
                  {{ cart.products.price * cart.qty }}
                </p>
                <button
                  @click="() => handleRemoveItem(cart.products)"
                  class="text cursor-pointer text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>

            <div class="space-y-3 mb-4 pb-4 border-b border-gray-200">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div class="flex justify-between text-xl font-bold text-gray-900 mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold mb-3"
            >
              Proceed to Checkout
            </button>
            <button
              @click="handleBack"
              class="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else className="text-center py-12">
      <h2 className="text-  2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
      <p className="text-gray-600 mb-6">Add some products to get started!</p>
      <button
        @click="handleBack"
        className="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  </ShopLayout>
</template>
