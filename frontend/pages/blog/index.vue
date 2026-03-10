<template>
  <section class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Blog</h1>
    <div class="grid grid-cols-1 gap-6">
      <div 
        v-for="post in posts" 
        :key="post.id"
        class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          <NuxtLink :href="`/blog/${post.slug}`" class="hover:text-blue-600 dark:hover:text-blue-400">
            {{ post.title }}
          </NuxtLink>
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
          By {{ post.author }} • {{ new Date(post.createdAt).toLocaleDateString() }}
        </p>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          {{ post.excerpt }}
        </p>
        <NuxtLink 
          :href="`/blog/${post.slug}`"
          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          Read More →
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  createdAt: string;
}

const { data: posts } = useFetch<BlogPost[]>(`${useRuntimeConfig().public.apiBaseUrl}/api/blog`);

useHead({
  title: 'Blog - Igna Ion Resmana'
})
</script>
