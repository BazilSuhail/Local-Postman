<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Request History</h1>
    <ul class="space-y-2">
      <li
        v-for="(item, index) in history"
        :key="index"
        class="p-3 bg-white shadow rounded flex justify-between"
      >
        <span>{{ item.method }} - {{ item.url }}</span>
        <span class="text-sm text-gray-500">{{ new Date(item.date).toLocaleString() }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const history = ref([]);
onMounted(() => {
  history.value = JSON.parse(localStorage.getItem("history") || "[]");
});
</script>
