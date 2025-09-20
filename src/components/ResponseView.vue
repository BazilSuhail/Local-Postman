<template>
  <div class="bg-white p-4 rounded-lg shadow mt-6">
    <h2 class="font-semibold text-lg mb-4">Response</h2>
    <div v-if="status==='loading'" class="text-yellow-600">Sending request...</div>
    <div v-else-if="response">
      <div class="mb-2 font-medium">
        Status: 
        <span :class="statusColor(response.status)">{{ response.status }} {{ response.statusText }}</span>
      </div>
      <div class="mb-2">
        <h3 class="font-semibold">Headers</h3>
        <pre class="bg-gray-100 p-2 rounded text-xs">{{ response.headers }}</pre>
      </div>
      <div>
        <h3 class="font-semibold">Body</h3>
        <pre class="bg-gray-900 text-green-300 p-3 rounded text-sm overflow-auto">{{ pretty(response.body) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
const { response, status } = inject("api");

function pretty(data) {
  return typeof data === "string" ? data : JSON.stringify(data, null, 2);
}

function statusColor(code) {
  if (!code) return "";
  if (code >= 400) return "text-red-600";
  if (code >= 300) return "text-yellow-600";
  return "text-green-600";
}
</script>
