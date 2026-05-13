<template>
  <nav class="bg-gray-100 dark:bg-gray-900 p-3 mb-6 rounded">
    <div class="max-w-5xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/posts" class="font-semibold">Admin</NuxtLink>
        <NuxtLink to="/admin/posts" class="text-sm text-gray-600 hover:underline">Posts</NuxtLink>
        <NuxtLink to="/admin/new" class="text-sm text-gray-600 hover:underline">New</NuxtLink>
        <NuxtLink to="/" class="text-sm text-gray-600 hover:underline">Site</NuxtLink>
      </div>
      <div>
        <button @click="logout" class="px-3 py-1 bg-red-600 text-white rounded text-sm">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function logout() {
  try {
    if (typeof window !== 'undefined') localStorage.removeItem('admin_token')
  } catch (e) {}
  router.push('/admin/login')
}
</script>
