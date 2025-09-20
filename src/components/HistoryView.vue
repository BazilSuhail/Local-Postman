<template>
  <div class="bg-white p-4 rounded-lg shadow mt-6">
    <h2 class="font-semibold text-lg mb-4">History</h2>
    <ul>
      <li v-for="(h,i) in history" :key="i" class="text-sm border-b py-2 flex justify-between">
        <span><span class="font-bold">{{ h.method }}</span> {{ h.url }}</span>
        <span class="text-gray-500">{{ new Date(h.date).toLocaleTimeString() }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { inject } from "vue";
const { history } = inject("api");
</script>
