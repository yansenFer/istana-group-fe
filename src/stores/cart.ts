import type { ICart, IProduct } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as ICart[],
  }),

  getters: {
    totalItems(state): number {
      return state.items.reduce((total, item) => total + item.qty, 0)
    },
  },

  actions: {
    addToCart(product: IProduct) {
      const found = this.items.find((item) => item.id === product.id)
      console.log(product, 'ini di store')
      if (found) {
        found.qty++
      } else {
        this.items.push({
          id: product.id,
          qty: 1,
          products: product,
        })
      }
    },

    removeFromCart(productId: number) {
      const index = this.items.findIndex((item) => item.id === productId)
      if (index !== -1) {
        const item = this.items[index]
        if (item!.qty > 1) item!.qty--
        else this.items.splice(index, 1)
      }
    },

    removeItem(product: IProduct) {
      this.items = this.items.filter((item) => item.id !== product.id)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
