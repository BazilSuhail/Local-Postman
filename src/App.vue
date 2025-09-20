<template> 
     <!-- Show app only on >=1080px -->
    <div v-if="isLargeScreen" class="flex min-h-screen bg-gray-50">    
      <Sidebar />
      <main
        :class="[
          'flex-1 p-6 transition-all duration-300',
        ]"
      >
        <router-view />
      </main>
    </div>

    <!-- Fallback Page for small screens -->
    <div v-else class="h-screen flex items-center justify-center bg-gray-100">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-700">Not Supported</h1>
        <p class="text-gray-500 mt-2">This application works only on laptop/desktop (1080px+).</p>
      </div>
    </div>  
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import Sidebar from "./components/Sidebar.vue";


import { useApiTester } from "./composables/useApiTester";

const api = useApiTester();
provide("api", api);

// Responsive handling
const isLargeScreen = ref(window.innerWidth >= 1080);
const sidebarCollapsed = ref(false);

onMounted(() => {
  window.addEventListener("resize", () => {
    isLargeScreen.value = window.innerWidth >= 1080;
  });
});
</script>
