<script setup lang="ts">
import ButtonAction from '@/components/UI/ButtonAction.vue'
import InputField from '@/components/UI/InputField.vue'
import router from '@/router'
import { loginApi } from '@/service/api/auth.api'
import { useCartStore } from '@/stores/cart'
import type { IAuth } from '@/types'
import Cookies from 'universal-cookie'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import * as Yup from 'yup'

const cookies = new Cookies(null, { path: '/' })
const token = ref<string | null>(cookies.get('auth') ?? null)
const $toast = useToast()
const isOpenLogin = ref<boolean>(false)
const formRef = ref<HTMLElement | null>(null)
const cart = useCartStore()
const cartCount = computed(() => cart.totalItems)

function onCartClick() {
  router.push({ name: 'shop cart' })
}

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
})

const initialData = {
  username: '',
  password: '',
}

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: initialData,
})

const onSubmit = handleSubmit(async (values) => {
  const data: IAuth = values

  const dataObj = {
    username: data.username,
    password: data.password,
  }

  await loginApi(dataObj)
    .then((res) => {
      if (res.status === 201) {
        $toast.success('Login success')
        cookies.set('auth', res.data.token)
        token.value = res.data.token
        isOpenLogin.value = false
        resetForm()
      }
    })
    .catch((error) => $toast.error(error))
})

function openLogin() {
  isOpenLogin.value = !isOpenLogin.value
}
</script>
<template>
  <header class="bg-white border-b shadow-sm border-gray-200 sticky top-0 z-50">
    <div class="mx-auto px-4 relative py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Shop</h1>
      <div class="flex flex-row gap-3">
        <button
          v-if="token"
          @click="onCartClick"
          class="relative cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Cart
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
          >
            {{ cartCount }}
          </span>
        </button>
        <ButtonAction v-if="!token" :onClick="openLogin" buttonName="Login" class="w-fit!" />
        <form
          ref="formRef"
          v-if="isOpenLogin"
          class="absolute right-5 shadow-xl rounded-xl top-20 bg-white p-5 flex flex-col gap-5"
        >
          <div class="flex flex-col items-center gap-1">
            <span class="font-extrabold text-4xl text-orange-600">Login</span>
            <span class="text-black">Log in to start shopping</span>
          </div>

          <InputField name="username" label-name="Username" />
          <InputField type="password" name="password" label-name="Password" />
          <ButtonAction
            class="mt-5"
            type="button"
            button-name="Login"
            :onClick="onSubmit"
            :disabled="isSubmitting"
            :is-loading="isSubmitting"
          />
        </form>
      </div>
    </div>
  </header>
</template>
