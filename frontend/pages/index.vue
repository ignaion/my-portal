<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <div class="container mx-auto px-4 py-12">
      <header class="mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ about?.name || 'Loading...' }}</h1>
        <p class="text-xl text-gray-600">{{ about?.title || 'Professional Portfolio' }}</p>
      </header>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">About Me</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="font-medium text-lg mb-3">Experience</h3>
            <ul class="list-disc list-inside space-y-2">
              <li v-for="exp in about?.experience || []" :key="exp">{{ exp }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="font-medium text-lg mb-3">Backend API Status</h3>
          <p class="text-gray-700">{{ helloMessage || 'Checking backend...' }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useApi } from '../composables/useApi';

const { fetchHello, fetchAbout } = useApi();
const helloMessage = ref<string>('');
const about = ref<{
  name: string;
  title: string;
  experience: string[];
}>();

onMounted(async () => {
  try {
    helloMessage.value = await fetchHello();
    about.value = await fetchAbout();
  } catch (error) {
    helloMessage.value = 'Backend connection failed';
    console.error('API error:', error);
  }
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>