<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import DashboardLayout from '@/components/Layout/admin/DashboardAdmin.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import ButtonAction from '@/components/UI/ButtonAction.vue'
import InputField from '@/components/UI/InputField.vue'
import router from '@/router'
import { createUser, editUser, getUser } from '@/service/api/user.api'
import type { IUserForm } from '@/types/IUser'
import { useForm } from 'vee-validate'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import * as Yup from 'yup'

const route = useRoute()
const $toast = useToast()
const typeAction = route.query.type
const paramId = route.params.id

const schema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

const initialData = {
  username: '',
  email: '',
  password: '',
}

// ✅ Gunakan useForm() langsung
const { handleSubmit, setFieldValue, resetForm, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: initialData,
})

const onSubmit = handleSubmit(async (values) => {
  const data: IUserForm = values

  const dataObj = {
    username: data.username,
    email: data.email,
    password: data.password,
  }

  if (typeAction === 'create') {
    await createUser(dataObj)
      .then((res) => {
        if (res.status === 201) {
          $toast.success('Create success')
          router.replace({ path: '/user' })
          resetForm()
        }
      })
      .catch((error) => $toast.error(error))
  } else {
    await editUser(paramId?.toString()!, dataObj)
      .then((res) => {
        if (res.status === 200) {
          $toast.success('Edit success')
          router.replace({ path: '/user' })
          resetForm()
        }
      })
      .catch((error) => $toast.error(error))
  }
})

async function fetchData() {
  await getUser(paramId?.toString())
    .then((res) => {
      if (res.status === 200) {
        setFieldValue('username', res.data.username)
        setFieldValue('email', res.data.email)
        setFieldValue('password', res.data.password)
      }
    })
    .catch((err) => $toast.error(err))
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <DashboardLayout>
    <BaseCard>
      <form :submit="onSubmit" class="flex flex-col w-full">
        <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 w-full">
          <InputField label-name="Username" name="username" />
          <InputField label-name="Email" name="email" />
          <InputField label-name="Password" name="password" />
        </div>
        <div class="flex w-full justify-end">
          <ButtonAction
            :onClick="onSubmit"
            :is-loading="isSubmitting"
            class="w-32! flex mt-5"
            :disabled="isSubmitting"
            :button-name="typeAction === 'create' ? 'Create' : 'Simpan'"
          />
        </div>
      </form>
    </BaseCard>
  </DashboardLayout>
</template>
