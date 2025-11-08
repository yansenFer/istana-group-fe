<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import ButtonAction from '@/components/UI/ButtonAction.vue'
import InputField from '@/components/UI/InputField.vue'
import router from '@/router'
import { loginApi } from '@/service/api/auth.api'
import type { IAuth } from '@/types'
import Cookies from 'universal-cookie'
import { Form } from 'vee-validate'
import { useToast } from 'vue-toast-notification'
import * as Yup from 'yup'

const $toast = useToast()
const cookies = new Cookies(null, { path: '/' })

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
})

const initialData = {
  username: '',
  password: '',
}

function onInvalidSubmit() {
  const submitBtn = document.querySelector('.submit-btn')
  submitBtn?.classList.add('invalid')
  setTimeout(() => {
    submitBtn?.classList.remove('invalid')
  }, 1000)
}

async function onSubmit(values: any, { resetForm }: { resetForm: () => void }) {
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
        router.replace({ path: '/' })
        resetForm()
      }
    })
    .catch((error) => $toast.error(error))
}
</script>

<template>
  <div
    class="bg-linear-to-r w-screen h-screen flex justify-center items-center from-orange-300 via-orange-100 to-orange-300"
  >
    <Form
      v-slot="{ isSubmitting }"
      :initial-values="initialData"
      @submit="onSubmit"
      :validation-schema="schema"
      @invalid-submit="onInvalidSubmit"
      class="flex flex-col justify-center items-center border border-gray-200 bg-white shadow-lg px-10 gap-5 py-10 w-[400px] rounded-lg"
    >
      <div class="flex flex-col items-center gap-1">
        <span class="font-extrabold text-4xl text-orange-600">Admin Login</span>
        <span class="text-black">Please enter your detail for sign in</span>
      </div>

      <InputField name="username" label-name="Username" />
      <InputField type="password" name="password" label-name="Password" />
      <ButtonAction type="submit" button-name="Login" :disabled="isSubmitting" :is-loading="isSubmitting" />
    </Form>
  </div>
</template>
