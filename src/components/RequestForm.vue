<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h2 class="font-semibold text-lg mb-4">Request Configuration</h2>

    <!-- Method + URL -->
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

    <!-- Headers -->
    <div class="mb-3">
      <label class="font-medium text-sm">Headers</label>
      <div v-for="(h,i) in headers" :key="i" class="flex space-x-2 mt-1">
        <input v-model="h.key" placeholder="Key" class="border px-2 py-1 rounded flex-1" />
        <input v-model="h.value" placeholder="Value" class="border px-2 py-1 rounded flex-1" />
      </div>
      <button @click="headers.push({key:'', value:''})" class="text-xs mt-2 text-green-600">+ Add header</button>
    </div>

    <!-- Auth -->
    <div class="mb-3">
      <label class="flex items-center space-x-2">
        <input type="checkbox" v-model="enableAuth" />
        <span class="font-medium text-sm">Use Bearer Token</span>
      </label>
      <input
        v-if="enableAuth"
        v-model="token"
        placeholder="Enter token"
        class="w-full mt-2 border px-2 py-1 rounded"
      />
    </div>

    <!-- File -->
    <div class="mb-3">
      <label class="flex items-center space-x-2">
        <input type="checkbox" v-model="enableFile" />
        <span class="font-medium text-sm">Attach File</span>
      </label>
      <input
        v-if="enableFile"
        type="file"
        class="mt-2"
        @change="onFileChange"
      />
    </div>

    <!-- Body -->
    <div class="mb-3">
      <label class="flex items-center space-x-2">
        <input type="checkbox" v-model="includeBody" />
        <span class="font-medium text-sm">Include Body (JSON)</span>
      </label>
      <textarea
        v-if="includeBody"
        v-model="body"
        class="w-full h-32 border rounded px-2 py-1 font-mono text-sm mt-2"
        placeholder='{"name": "John"}'
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
const { method, url, headers, body, includeBody, enableAuth, token, enableFile, file, sendRequest } = inject("api");

function onFileChange(e) {
  file.value = e.target.files[0] || null;
}
</script>
