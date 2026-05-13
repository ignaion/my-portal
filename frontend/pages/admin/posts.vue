<template>
  <section class="max-w-5xl mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Admin — Posts</h1>

    <div class="mb-4 flex gap-2">
      <input v-model="q" placeholder="Search title/slug" class="p-2 border rounded flex-1" />
      <select v-model="filter" class="p-2 border rounded">
        <option value="published">Published</option>
        <option value="drafts">Drafts</option>
        <option value="all">All</option>
      </select>
      <button @click="fetchPosts" class="px-4 py-2 bg-blue-600 text-white rounded">Refresh</button>
      <NuxtLink to="/admin/new" class="px-4 py-2 bg-green-600 text-white rounded">New</NuxtLink>
    </div>

    <div v-if="loading">Loading…</div>

    <div v-else>
      <div v-if="posts.length===0">No posts found</div>
      <div v-for="p in filtered" :key="p.id" class="p-4 bg-white dark:bg-gray-800 rounded mb-3 flex justify-between items-center">
        <div>
          <NuxtLink :to="`/blog/${p.slug}`" class="text-lg font-semibold">{{ p.title }}</NuxtLink>
          <div class="text-sm text-gray-500">{{ p.slug }} • {{ p.author }} • {{ new Date(p.createdAt).toLocaleString() }}</div>
        </div>
        <div class="flex gap-2">
          <NuxtLink :to="`/admin/edit/${p.slug}`" class="px-3 py-1 bg-yellow-500 text-white rounded">Edit</NuxtLink>
          <button @click="togglePublish(p)" class="px-3 py-1 bg-purple-600 text-white rounded">{{ p.isPublished? 'Unpublish' : 'Publish' }}</button>
          <button @click="remove(p)" class="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const apiBase = config.public.apiBaseUrl || 'https://igna.my.id'
const token = localStorage.getItem('admin_token')
let header: any = {}
if (token) header.Authorization = `Bearer ${token}`
else if (config.public.NUXT_PUBLIC_ADMIN_KEY) header['x-admin-key'] = config.public.NUXT_PUBLIC_ADMIN_KEY

const q = ref('')
const filter = ref('published')
const posts = ref([] as any[])
const loading = ref(false)

const fetchPosts = async () => {
  loading.value = true
  try {
    let url = `${apiBase}/api/blog`
    if (filter.value === 'published') url += '?published=true'
    else if (filter.value === 'drafts') url += '?published=false'
    // all -> omit param
    const res = await $fetch(url, { headers: header })
    posts.value = res
  } catch (e) {
    alert('Failed to fetch posts')
  } finally {
    loading.value = false
  }
}

onMounted(fetchPosts)

const filtered = computed(() => {
  if (!q.value) return posts.value
  const qq = q.value.toLowerCase()
  return posts.value.filter(p => (p.title||'').toLowerCase().includes(qq) || (p.slug||'').toLowerCase().includes(qq))
})

const remove = async (p: any) => {
  if (!confirm('Delete this post?')) return
  await $fetch(`${apiBase}/api/blog/${p.slug}`, { method: 'DELETE', headers: header })
  alert('Deleted')
  fetchPosts()
}

const togglePublish = async (p: any) => {
  await $fetch(`${apiBase}/api/blog/${p.slug}`, { method: 'PATCH', headers: header, body: { isPublished: !p.isPublished } })
  fetchPosts()
}
</script>
