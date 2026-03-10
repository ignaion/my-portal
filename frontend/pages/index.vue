<template>
  <section class="max-w-4xl mx-auto text-center">
    <div class="mb-8">
      <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Hi, I'm Igna Ion Resmana
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300">
        Software Engineer specializing in NodeJS, NestJS, Vue, and Flutter
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Backend Development</h3>
        <p class="text-gray-600 dark:text-gray-300">NodeJS, NestJS, PostgreSQL, Drizzle ORM</p>
      </div>
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Frontend Development</h3>
        <p class="text-gray-600 dark:text-gray-300">Vue.js, Nuxt.js, Tailwind CSS</p>
      </div>
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Mobile Development</h3>
        <p class="text-gray-600 dark:text-gray-300">Flutter, Cross-platform Apps</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'Home - Igna Ion Resmana'
})
</script>
