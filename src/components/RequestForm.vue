<template>
  <div class="sticky top-[15px] bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <!-- Header -->
  <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3 ">
      <div class="p-[4px] bg-emerald-600 rounded-md">
        <ArrowsRightLeftIcon  class="w-5 h-4 text-white" />
      </div>
      <h2 class="text-md font-[600] bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
        Request Configuration
      </h2>
    </div>
      <button @click="sendRequest" :disabled="status === 'loading'"
          class="flex items-center justify-center gap-2 py-[6px] bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors min-w-[100px]">
          <div v-if="status === 'loading'"
            class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <PaperAirplaneIcon v-else class="w-[15px] h-[15px] text-white" />
          <span class="text-white text-[16px] mr-2">Send</span>
        </button>

  </div>
    <!-- Method + URL -->
    <div class="flex gap-3 mb-6">
      <CustomDropdown v-model="method" :methods="['GET', 'POST', 'PUT', 'PATCH', 'DELETE']" />
      <div class="flex-1 flex gap-x-3">
        <input v-model="url"
          class="flex-1 px-4 bg-gray-50 py-[8px] border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          placeholder="http://localhost:3000/api" />
      
      </div>
    </div>

    <!-- Headers -->
    <div class="mb-6">
      <button @click="toggleSection('headers')" class="flex items-center justify-between w-full mb-4 group py-2">
        <div class="flex items-center gap-3">
          <DocumentTextIcon class="w-5 h-5 text-emerald-600" />
          <span class="font-semibold text-gray-900">Headers</span>
          <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            {{headers.filter(h => h.key.trim()).length}}
          </span>
        </div>
        <ChevronDownIcon :class="`w-4 h-4 transition-transform ${expandedSections.headers ? 'rotate-180' : ''}`" />
      </button>

      <div v-if="expandedSections.headers" class="space-y-3 pl-1">
        <div v-for="(h, i) in headers" :key="i" class="flex flex-col sm:flex-row gap-3">
          <input v-model="h.key" placeholder="Header name"
            class="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" />
          <input v-model="h.value" placeholder="Header value"
            class="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" />
          <button @click="removeHeader(i)"
            class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start sm:self-auto">
            <TrashIcon class="w-4 h-4" />
          </button>
        </div>
        <button @click="headers.push({ key: '', value: '' })"
          class="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors py-1">
          <PlusIcon class="w-4 h-4" />
          Add Header
        </button>
      </div>
    </div>

   <!-- Auth -->
<div class="mb-6">
  <div class="flex items-center gap-3 mb-4 py-2">
    <button 
      @click="enableAuth = !enableAuth"
      :class="`p-2 rounded-lg transition-colors ${enableAuth ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`"
    >
      <LockClosedIcon class="w-5 h-5" />
    </button>
    <span 
      @click="enableAuth = !enableAuth"
      class="font-semibold text-gray-900 cursor-pointer"
    >
      Bearer Token Authentication
    </span>
  </div>

  <div v-if="enableAuth" class="space-y-3 pl-1">
    <div class="relative">
      <input 
        :type="showToken ? 'text' : 'password'" 
        v-model="token" 
        placeholder="Enter your bearer token"
        class="w-full px-4 py-2.5 pr-20 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-sm transition-all" 
      />
      <div class="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
        <button 
          @click="showToken = !showToken" 
          class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          :title="showToken ? 'Hide token' : 'Show token'"
        >
          <EyeSlashIcon v-if="showToken" class="w-4 h-4" />
          <EyeIcon v-else class="w-4 h-4" />
        </button>
        <button 
          v-if="token" 
          @click="copyToClipboard(token, 'token')"
          class="p-1 text-gray-400 hover:text-gray-600 transition-colors" 
          title="Copy token"
        >
          <CheckIcon v-if="copied === 'token'" class="w-4 h-4 text-green-500" />
          <ClipboardIcon v-else class="w-4 h-4" />
        </button>
      </div>
    </div>
    <div v-if="token && !showToken" class="text-sm text-gray-500 font-mono pl-1">
      Preview: {{ maskToken(token) }}
    </div>
  </div>
</div>

<!-- File -->
<div class="mb-6">
  <div class="flex items-center gap-3 mb-4 py-2">
    <button 
      @click="enableFile = !enableFile"
      :class="`p-2 rounded-lg transition-colors ${enableFile ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`"
    >
      <ArrowUpTrayIcon class="w-5 h-5" />
    </button>
    <span 
      @click="enableFile = !enableFile"
      class="font-semibold text-gray-900 cursor-pointer"
    >
      File Upload
    </span>
  </div>

  <div v-if="enableFile" class="space-y-3 pl-1">
    <div 
      @click="$refs.fileInput.click()"
      class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 cursor-pointer transition-colors"
    >
      <div v-if="file" class="flex flex-col sm:flex-row items-center justify-center gap-2">
        <DocumentIcon class="w-5 h-5 text-emerald-600" />
        <span class="font-medium text-center sm:text-left">{{ file.name }}</span>
        <span class="text-sm text-gray-500">({{ (file.size / 1024).toFixed(1) }} KB)</span>
      </div>
      <div v-else class="py-4">
        <ArrowUpTrayIcon class="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p class="text-gray-600">Click to select a file</p>
      </div>
    </div>
    <input ref="fileInput" type="file" class="hidden" @change="onFileChange" />
  </div>
</div>

<!-- Body -->
<div class="mb-6">
  <div class="flex items-center gap-3 mb-4 py-2">
    <button 
      @click="includeBody = !includeBody"
      :class="`p-2 rounded-lg transition-colors ${includeBody ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`"
    >
      <CodeBracketIcon class="w-5 h-5" />
    </button>
    <span 
      @click="includeBody = !includeBody"
      class="font-semibold text-gray-900 cursor-pointer"
    >
      Request Body (JSON)
    </span>
  </div>

  <div v-if="includeBody" class="relative pl-1">
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
      <CheckIcon v-if="copied === 'body'" class="w-4 h-4 text-green-500" />
      <ClipboardIcon v-else class="w-4 h-4" />
    </button>
  </div>
</div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import {
  ArrowsRightLeftIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  TrashIcon,
  PlusIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  ClipboardIcon,
  ArrowUpTrayIcon,
  DocumentIcon,
  CodeBracketIcon
} from "@heroicons/vue/24/outline";
import CustomDropdown from './DropDown.vue';

const { method, url, headers, body, includeBody, enableAuth, token, enableFile, file, sendRequest, status } = inject("api");

// Local state for UI enhancements
const showToken = ref(false);
const copied = ref('');
const expandedSections = ref({
  headers: false
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