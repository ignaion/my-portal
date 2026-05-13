<template>
  <section class="max-w-4xl mx-auto">
    <div class="flex flex-col md:flex-row gap-8 items-center mb-12">
      <div class="w-full md:w-1/3">
        <div class="aspect-square rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
          <img
            :src="avatarSrc"
            alt="Igna Ion Resmana"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
      <div class="w-full md:w-2/3">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-4">
          I'm a passionate Software Engineer with over [X] years of experience building scalable backend services,
          interactive frontend applications, and cross-platform mobile apps.
        </p>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-4">
          My expertise includes NodeJS, NestJS, Vue.js, Nuxt.js, PostgreSQL, and Flutter. I love solving complex
          problems and building tools that make people's lives easier.
        </p>
        <div class="flex gap-4 mt-6">
          <a 
            href="https://id.linkedin.com/in/igna-ion-resmana-18131270" 
            target="_blank" 
            rel="noopener noreferrer"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com/ignaion" 
            target="_blank" 
            rel="noopener noreferrer"
            class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'About - Igna Ion Resmana'
})

const avatarSrc = '/avatar.jpg'
</script>
