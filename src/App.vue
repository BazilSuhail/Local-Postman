<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main content -->
    <main class="flex-1 overflow-auto bg-gray-50 p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>
