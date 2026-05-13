<template>
  <section class="max-w-md mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Admin Login</h1>
    <form @submit.prevent="submit">
      <label class="block mb-2">Username</label>
      <input v-model="username" class="w-full p-2 border rounded mb-4" />

      <label class="block mb-2">Password</label>
      <input type="password" v-model="password" class="w-full p-2 border rounded mb-4" />

      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import { useRouter } from 'vue-router'

const config = useRuntimeConfig()
const apiBase = config.public.apiBaseUrl || 'https://igna.my.id'
const router = useRouter()

const username = ref('')
const password = ref('')

const submit = async () => {
  try {
    const res = await $fetch(`${apiBase}/api/auth/login`, {
      method: 'POST',
      body: { username: username.value, password: password.value }
    })
    const token = res?.token
    if (token) {
      localStorage.setItem('admin_token', token)
      alert('Login successful')
      router.push('/admin/new')
    } else {
      alert('Invalid credentials')
    }
  } catch (e) {
    alert('Login failed')
  }
}
</script>
