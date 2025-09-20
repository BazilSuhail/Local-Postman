<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-emerald-100 rounded-lg">
        <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
        </svg>
      </div>
      <h2 class="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
        Request Configuration
      </h2>
    </div>

    <!-- Method + URL -->
    <div class="flex gap-3 mb-6">
      <select 
        v-model="method" 
        :class="`px-4 py-2 rounded-lg border-2 font-semibold text-white transition-colors min-w-28 ${getMethodColor(method)}`"
      >
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>PATCH</option>
        <option>DELETE</option>
      </select>
      <input 
        v-model="url" 
        class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
        placeholder="http://localhost:3000/api" 
      />
      <button 
        @click="sendRequest" 
        :disabled="status === 'loading'"
        class="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
      >
        <div v-if="status === 'loading'" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
        </svg>
        Send
      </button>
    </div>

    <!-- Headers -->
    <div class="mb-6">
      <button
        @click="toggleSection('headers')"
        class="flex items-center justify-between w-full mb-4 group"
      >
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span class="font-semibold text-gray-900">Headers</span>
          <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            {{ headers.filter(h => h.key.trim()).length }}
          </span>
        </div>
        <svg :class="`w-4 h-4 transition-transform ${expandedSections.headers ? 'rotate-180' : ''}`" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      <div v-if="expandedSections.headers" class="space-y-3">
        <div v-for="(h, i) in headers" :key="i" class="flex gap-3">
          <input 
            v-model="h.key" 
            placeholder="Header name" 
            class="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
          />
          <input 
            v-model="h.value" 
            placeholder="Header value" 
            class="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
          />
          <button 
            @click="removeHeader(i)"
            class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
        <button 
          @click="headers.push({key:'', value:''})" 
          class="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Header
        </button>
      </div>
    </div>

    <!-- Auth -->
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-4">
        <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        <label class="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            v-model="enableAuth" 
            class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
          />
          <span class="font-semibold text-gray-900">Bearer Token Authentication</span>
        </label>
      </div>
      
      <div v-if="enableAuth" class="space-y-3">
        <div class="relative">
          <input
            :type="showToken ? 'text' : 'password'"
            v-model="token"
            placeholder="Enter your bearer token"
            class="w-full px-4 py-2 pr-20 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-sm transition-all"
          />
          <div class="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
            <button 
              @click="showToken = !showToken"
              class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              :title="showToken ? 'Hide token' : 'Show token'"
            >
              <svg v-if="showToken" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
            <button 
              v-if="token"
              @click="copyToClipboard(token, 'token')"
              class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy token"
            >
              <svg v-if="copied === 'token'" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div v-if="token && !showToken" class="text-sm text-gray-500 font-mono">
          Preview: {{ maskToken(token) }}
        </div>
      </div>
    </div>

    <!-- File -->
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-4">
        <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <label class="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            v-model="enableFile" 
            class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
          />
          <span class="font-semibold text-gray-900">File Upload</span>
        </label>
      </div>
      
      <div v-if="enableFile" class="space-y-3">
        <div 
          @click="$refs.fileInput.click()"
          class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 cursor-pointer transition-colors"
        >
          <div v-if="file" class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span class="font-medium">{{ file.name }}</span>
            <span class="text-sm text-gray-500">({{ (file.size / 1024).toFixed(1) }} KB)</span>
          </div>
          <div v-else>
            <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p class="text-gray-600">Click to select a file</p>
          </div>
        </div>
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          @change="onFileChange"
        />
      </div>
    </div>

    <!-- Body -->
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-4">
        <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
        <label class="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            v-model="includeBody" 
            class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
          />
          <span class="font-semibold text-gray-900">Request Body (JSON)</span>
        </label>
      </div>
      
      <div v-if="includeBody" class="relative">
        <textarea
          v-model="body"
          class="w-full h-32 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-sm resize-none transition-all"
          placeholder='{"name": "John", "email": "john@example.com"}'
        ></textarea>
        <button 
          @click="copyToClipboard(body, 'body')"
          class="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          title="Copy body"
        >
          <svg v-if="copied === 'body'" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";

const { method, url, headers, body, includeBody, enableAuth, token, enableFile, file, sendRequest, status } = inject("api");

// Local state for UI enhancements
const showToken = ref(false);
const copied = ref('');
const expandedSections = ref({
  headers: true
});

function onFileChange(e) {
  file.value = e.target.files[0] || null;
}

function removeHeader(index) {
  headers.value.splice(index, 1);
}

function toggleSection(section) {
  expandedSections.value[section] = !expandedSections.value[section];
}

function getMethodColor(method) {
  const colors = {
    'GET': 'bg-blue-500 hover:bg-blue-600 border-blue-500',
    'POST': 'bg-emerald-500 hover:bg-emerald-600 border-emerald-500',
    'PUT': 'bg-amber-500 hover:bg-amber-600 border-amber-500',
    'DELETE': 'bg-red-500 hover:bg-red-600 border-red-500',
    'PATCH': 'bg-purple-500 hover:bg-purple-600 border-purple-500'
  };
  return colors[method] || 'bg-gray-500 hover:bg-gray-600 border-gray-500';
}

function maskToken(token) {
  if (!token) return '';
  if (token.length <= 8) return token;
  return token.substring(0, 4) + '•'.repeat(token.length - 8) + token.substring(token.length - 4);
}

async function copyToClipboard(text, type) {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = type;
    setTimeout(() => copied.value = '', 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}
</script>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>