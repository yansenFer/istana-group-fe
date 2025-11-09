export interface IProductForm {
  id?: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}
