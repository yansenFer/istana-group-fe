export interface IUser {
  id: number
  username: string
  email: string
  password: string

  address: {
    geolocation: {
      lat: string
      long: string
    }
    city: string
    street: string
    number: number
    zipcode: string
  }
  name: {
    firstname: string
    lastname: string
  }
  phone: number
}

export interface IUserForm {
  id?: number
  username: string
  email: string
  password: string
}
