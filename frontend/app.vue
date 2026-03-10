<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink href="/" class="text-xl font-bold text-gray-900 dark:text-white">
          Igna Ion Resmana
        </NuxtLink>
        <nav class="space-x-6">
          <NuxtLink href="/" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Home
          </NuxtLink>
          <NuxtLink href="/blog" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Blog
          </NuxtLink>
          <NuxtLink href="/about" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            About
          </NuxtLink>
        </nav>
      </div>
    </header>
    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
    <footer class="bg-white dark:bg-gray-800 shadow-inner mt-12 py-6">
      <div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>© 2024 Igna Ion Resmana. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>
