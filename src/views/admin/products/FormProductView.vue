<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import DashboardLayout from '@/components/Layout/admin/DashboardAdmin.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import ButtonAction from '@/components/UI/ButtonAction.vue'
import InputField from '@/components/UI/InputField.vue'
import router from '@/router'
import { createProduct, editProduct, getProduct } from '@/service/api/product.api'
import type { IProductForm } from '@/types'
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
  title: Yup.string().required(),
  price: Yup.number().required(),
  description: Yup.string().required(),
  category: Yup.string().required(),
})

const initialData = {
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
}

// ✅ Gunakan useForm() langsung
const { handleSubmit, setFieldValue, resetForm, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: initialData,
})

const onSubmit = handleSubmit(async (values) => {
  const data: IProductForm = values

  const dataObj = {
    title: data.title,
    price: data.price,
    description: data.description,
    category: data.category,
    image: data.image,
  }

  if (typeAction === 'create') {
    await createProduct(dataObj)
      .then((res) => {
        if (res.status === 201) {
          $toast.success('Create success')
          router.replace({ path: '/product' })
          resetForm()
        }
      })
      .catch((error) => $toast.error(error))
  } else {
    await editProduct(paramId?.toString()!, dataObj)
      .then((res) => {
        if (res.status === 200) {
          $toast.success('Edit success')
          router.replace({ path: '/product' })
          resetForm()
        }
      })
      .catch((error) => $toast.error(error))
  }
})

async function fetchData() {
  await getProduct(paramId?.toString())
    .then((res) => {
      if (res.status === 200) {
        setFieldValue('category', res.data.category)
        setFieldValue('description', res.data.description)
        setFieldValue('image', res.data.image)
        setFieldValue('price', res.data.price)
        setFieldValue('title', res.data.title)
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
          <InputField label-name="Title" name="title" />
          <InputField label-name="Price" name="price" />
          <InputField label-name="Description" name="description" />
          <InputField label-name="Category" name="category" />
          <InputField label-name="Image" name="image" />
        </div>
        <div class="flex w-full justify-end">
          <ButtonAction
            :onClick="onSubmit"
            :is-loading="isSubmitting"
            class="w-32! flex mt-5"
            :disabled="isSubmitting"
            :button-name="typeAction === 'create' ? 'Create' : 'Edit'"
          />
        </div>
      </form>
    </BaseCard>
  </DashboardLayout>
</template>
