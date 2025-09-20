<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h2 class="font-semibold text-lg mb-4">Request Configuration</h2>
    <div class="flex space-x-2 mb-3">
      <select v-model="method" class="border px-2 py-1 rounded w-28">
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>PATCH</option>
        <option>DELETE</option>
      </select>
      <input v-model="url" class="flex-1 border px-3 py-1 rounded" placeholder="http://localhost:3000/api" />
      <button @click="sendRequest" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Send</button>
    </div>

    <div class="mb-3">
      <label class="font-medium text-sm">Headers</label>
      <div v-for="(h,i) in headers" :key="i" class="flex space-x-2 mt-1">
        <input v-model="h.key" placeholder="Key" class="border px-2 py-1 rounded flex-1" />
        <input v-model="h.value" placeholder="Value" class="border px-2 py-1 rounded flex-1" />
      </div>
      <button @click="headers.push({key:'', value:''})" class="text-xs mt-2 text-green-600">+ Add header</button>
    </div>

    <div>
      <label class="font-medium text-sm">Body (JSON)</label>
      <textarea v-model="body" class="w-full h-32 border rounded px-2 py-1 font-mono text-sm" placeholder='{"name": "John"}'></textarea>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
const { method, url, headers, body, sendRequest } = inject("api");
</script>
