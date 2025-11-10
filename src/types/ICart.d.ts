import type { IProduct } from './IProduct'

export interface ICart {
  id: number
  qty: number
  products: IProduct
}

export interface ICartForm {
  id?: number
  userId: number
  products: IProduct[]
}
