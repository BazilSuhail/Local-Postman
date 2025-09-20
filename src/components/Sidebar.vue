<!-- src/components/Sidebar.vue -->
<template>
  <div
    :class="[
      'bg-white shadow h-screen flex flex-col transition-all duration-300',
      isCollapsed ? 'w-[60px]' : 'w-[285px]'
    ]"
  >
    <!-- Logo + Toggle -->
    <div class="flex items-center justify-between px-4 py-4 border-b">
      <span v-if="!isCollapsed" class="font-bold text-xl text-green-600">
        LocalPostman
      </span>
      <button @click="isCollapsed = !isCollapsed" class="p-2 rounded hover:bg-gray-100">
        <!-- Collapse / Expand icons -->
        <svg v-if="isCollapsed" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600"
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600"
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 mt-6 space-y-2">
      <router-link
        to="/"
        class="flex items-center px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg"
        active-class="bg-green-100 text-green-700 font-medium"
      >
        <svg class="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8" />
        </svg>
        <span v-if="!isCollapsed" class="ml-3">API Tester</span>
      </router-link>

      <router-link
        to="/history"
        class="flex items-center px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg"
        active-class="bg-green-100 text-green-700 font-medium"
      >
        <svg class="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span v-if="!isCollapsed" class="ml-3">History</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isCollapsed = ref(false);
</script>
