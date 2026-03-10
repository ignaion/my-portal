<template>
  <section class="max-w-4xl mx-auto">
    <div v-if="post" class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-4xl font-bold mb-2">{{ post.title }}</h1>
      <div class="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
        <span>By {{ post.author }}</span>
        <span>•</span>
        <span>{{ new Date(post.createdAt).toLocaleDateString() }}</span>
      </div>
      <div v-html="post.content"></div>
      <div class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <NuxtLink 
          href="/blog" 
          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          ← Back to Blog
        </NuxtLink>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <p class="text-xl text-gray-600 dark:text-gray-300">Loading post...</p>
    </div>
  </section>
</template>

<script setup lang="ts">
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  createdAt: string;
}

const route = useRoute();
const { data: post } = useFetch<BlogPost>(`${useRuntimeConfig().public.apiBaseUrl}/api/blog/${route.params.slug}`);

useHead({
  title: post?.title || 'Blog Post'
})
</script>
