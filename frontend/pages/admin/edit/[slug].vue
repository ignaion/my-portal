<template>
  <section class="max-w-3xl mx-auto py-8">
    <AdminNav />
    <h1 class="text-2xl font-bold mb-4">Admin - Edit Post</h1>
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

      <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded">Update Post</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const slugParam = route.params.slug as string

const config = useRuntimeConfig()
const apiBase = config.public.apiBaseUrl || 'https://igna.my.id'

const title = ref('')
const slug = ref('')
const excerpt = ref('')
const contentMarkdown = ref('')
const isPublished = ref(false)

// load post
onMounted(async () => {
  const res = await $fetch(`${apiBase}/api/blog/${slugParam}`)
  title.value = res.title || ''
  slug.value = res.slug || ''
  excerpt.value = res.excerpt || ''
  isPublished.value = !!res.isPublished

  // Prefer the stored markdown if present
  if (res.contentMarkdown) {
    contentMarkdown.value = res.contentMarkdown
    return
  }

  // If only HTML content exists, convert to Markdown on the client using Turndown (loaded from CDN)
  if (res.content && process.client) {
    try {
      if (typeof (window as any).TurndownService === 'undefined') {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script')
          s.src = 'https://unpkg.com/turndown@7.1.1/dist/turndown.js'
          s.onload = () => resolve(undefined)
          s.onerror = () => reject(new Error('Failed to load turndown'))
          document.head.appendChild(s)
        })
      }
      const T = (window as any).TurndownService
      const t = new T()
      contentMarkdown.value = t.turndown(res.content)
    } catch (e) {
      // fallback: strip HTML tags
      contentMarkdown.value = res.content.replace(/<[^>]+>/g, '').trim()
    }
  } else {
    contentMarkdown.value = res.contentMarkdown || ''
  }
})

const submit = async () => {
  const token = localStorage.getItem('admin_token')
  const headers: any = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  else {
    const adminKey = config.public.NUXT_PUBLIC_ADMIN_KEY || ''
    if (adminKey) headers['x-admin-key'] = adminKey
  }

  try {
    const payload: any = {
      title: title.value,
      slug: slug.value,
      excerpt: excerpt.value,
      isPublished: isPublished.value,
    }
    if (contentMarkdown.value) payload.contentMarkdown = contentMarkdown.value

    await $fetch(`${apiBase}/api/blog/${slugParam}`, {
      method: 'PATCH',
      headers,
      body: payload
    })
    alert('Post updated')
    router.push(`/blog/${payload.slug}`)
  } catch (e) {
    alert('Failed to update: ' + (e?.data?.message || e?.message || e))
  }
}
</script>
