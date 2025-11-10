<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import DashboardLayout from '@/components/Layout/admin/DashboardAdmin.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import TableList from '@/components/UI/TableList.vue'
import router from '@/router'
import { deleteUser, getUser } from '@/service/api/user.api'
import type { IUser } from '@/types/IUser'
import { computed } from '@vue/reactivity'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'

const dataUser = ref<IUser[]>([])
const isLoading = ref<boolean>(true)
const $toast = useToast()

function routeForm(type: 'create' | 'edit', id?: string) {
  if (type === 'create') return router.push({ name: 'create user', query: { type } })
  if (type === 'edit') return router.push({ name: 'edit user', params: { id } })
}

const showAlert = (id: string) => {
  if (confirm(`Apakah kamu yakin ingin menghapus data ini dengan id ${id}?`)) {
    deleteList(id)
  }
}

async function deleteList(id: string) {
  await deleteUser(id).then((res) => {
    if (res.status === 200) {
      fetchData()
      $toast.success(`Delete ${id} success`)
    }
  })
}

const fetchData = async () => {
  await getUser()
    .then((res) => {
      if (res.status === 200) {
        dataUser.value = res.data
      }
    })
    .catch((err) => $toast.error(err))
    .finally(() => (isLoading.value = false))
}

onMounted(fetchData)

// const initialData = {
//   search: '',
// }

const headers = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'address', label: 'Address' },
  { key: 'phone', label: 'Phone' },
]

const rows = computed(() =>
  dataUser.value.map((user) => ({
    id: user.id,
    username: user.username,
    name: `${user.name.firstname} ${user.name.lastname}`,
    email: user.email,
    password: user.password,
    address: `${user.address.street} ${user.address.number && `, ${user.address.number}`} ${user.address.city && `, ${user.address.city}`} ${user.address.zipcode && `, ${user.address.zipcode}}`}`,
    phone: user.phone,
  })),
)

// async function onSubmit(values: any) {
// }
</script>
<template>
  <DashboardLayout>
    <!-- <BaseCard>
      <Form
        v-slot="{ isSubmitting }"
        :initial-values="initialData"
        @submit="onSubmit"
        class="flex flex-row gap-3 w-full items-center justify-between"
      >
        <InputField placeholder="Search..." name="search" />
        <ButtonAction class="w-20!" type="submit" button-name="Search" :disabled="isSubmitting" :is-loading="isSubmitting" />
      </Form>
    </BaseCard> -->

    <BaseCard>
      <div class="flex flex-col w-full">
        <TableList
          create-name="Create User"
          :onDelete="(e) => showAlert(e)"
          :onEdit="(e) => routeForm('edit', e)"
          :is-action="true"
          table-name="List User"
          :headers="headers"
          :rows="rows"
          :is-loading="isLoading"
          :onCreate="() => routeForm('create')"
        />
      </div>
    </BaseCard>
  </DashboardLayout>
</template>
