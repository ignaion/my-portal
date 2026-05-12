<template>
  <section class="max-w-3xl mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Admin - New Post</h1>
    <form @submit.prevent="submit">
      <label class="block mb-2">Title</label>
      <input v-model="title" class="w-full p-2 border rounded mb-4" />

      <label class="block mb-2">Slug</label>
      <input v-model="slug" class="w-full p-2 border rounded mb-4" />

      <label class="block mb-2">Excerpt</label>
      <textarea v-model="excerpt" class="w-full p-2 border rounded mb-4"></textarea>

      <label class="block mb-2">Content (Markdown)</label>
      <textarea v-model="contentMarkdown" rows="12" class="w-full p-2 border rounded mb-4"></textarea>

      <label class="inline-flex items-center mb-4">
        <input type="checkbox" v-model="isPublished" class="mr-2" /> Published
      </label>

      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Create Post</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import { useRouter } from 'vue-router'

const config = useRuntimeConfig()
const adminKey = config.public.NUXT_PUBLIC_ADMIN_KEY || ''

const title = ref('')
const slug = ref('')
const excerpt = ref('')
const contentMarkdown = ref('')
const isPublished = ref(false)

const submit = async () => {
  const apiBase = config.public.apiBaseUrl || 'https://igna.my.id'
  const resp = await $fetch(`${apiBase}/api/blog`, {
    method: 'POST',
    headers: {
      'x-admin-key': adminKey
    },
    body: {
      title: title.value,
      slug: slug.value,
      excerpt: excerpt.value,
      contentMarkdown: contentMarkdown.value,
      author: 'Igna',
      isPublished: isPublished.value
    }
  })
  alert('Post created')
}
</script>
