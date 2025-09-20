<template> 
    <div class="flex justify-between items-center gap-8 mb-8">
      <!-- Left Side - Header Info -->
      <div class="flex-1">
        <div class="flex items-center gap-4 mb-3">
          <div class="relative">
            <div class="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl shadow-sm">
              <BoltIcon class="w-7 h-7 text-emerald-600" />
            </div>
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          
          <div>
            <h1 class="text-[28px] font-bold bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent leading-tight">
              API Endpoints Tester
            </h1>
            <div class="flex items-center gap-3 mt-2">
              <p class="text-gray-600 text-[15px]">
                Test and debug your API endpoints with professional tools
              </p>
              <div class="hidden lg:flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                <CheckCircleIcon class="w-3 h-3" />
                Pro Version
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Quick Actions -->
      <div class="lg:flex-shrink-0">
        <div class="flex flex-col sm:flex-row lg:flex-row gap-3">
          <button @click="clearAll"
            class="group flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-200 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow">
            <TrashIcon class="w-4 h-4 transition-transform group-hover:scale-110" />
            <span class="text-[14px] font-semibold">Clear All</span>
          </button>

          <button @click="exportConfig"
            class="group flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-200 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow">
            <DocumentArrowDownIcon class="w-4 h-4 transition-transform group-hover:scale-110" />
            <span class="text-[14px] font-semibold">Export</span>
          </button>

          <button @click="saveTemplate"
            class="group flex items-center justify-center gap-2 px-4 py-3 border-2 border-emerald-200 text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200 shadow-sm hover:shadow">
            <BookmarkIcon class="w-4 h-4 transition-transform group-hover:scale-110" />
            <span class="text-[14px] font-semibold">Save Template</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Request Form -->
      <div class="space-y-6">
        <RequestForm />
      </div>

      <!-- Response View -->
      <div class="space-y-6">
        <ResponseView />
      </div>
    </div> 
</template>

<script setup>
import { inject } from "vue";
import {
  BoltIcon,
  CheckCircleIcon,
  TrashIcon,
  DocumentArrowDownIcon,
  BookmarkIcon
} from "@heroicons/vue/24/outline";
import RequestForm from "../components/RequestForm.vue";
import ResponseView from "../components/ResponseView.vue";

const {
  method,
  url,
  headers,
  body,
  includeBody,
  enableAuth,
  token,
  enableFile,
  file,
  response,
  status,
  history,
  sendRequest
} = inject("api");

function getStatusColor(code) {
  if (!code) return "text-gray-600";
  if (code >= 400) return "text-red-600";
  if (code >= 300) return "text-amber-600";
  return "text-emerald-600";
}

function clearAll() {
  method.value = "GET";
  url.value = "http://localhost:3000/api";
  headers.value = [{ key: "", value: "" }];
  body.value = "";
  includeBody.value = false;
  enableAuth.value = false;
  token.value = "";
  enableFile.value = false;
  file.value = null;
  response.value = null;
  status.value = null;
}

function exportConfig() {
  const config = {
    method: method.value,
    url: url.value,
    headers: headers.value.filter(h => h.key.trim()),
    body: includeBody.value ? body.value : null,
    auth: enableAuth.value ? { token: token.value } : null,
    file: enableFile.value ? file.value?.name : null
  };

  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const url2 = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url2;
  a.download = 'api-config.json';
  a.click();
  URL.revokeObjectURL(url2);
}

function saveTemplate() {
  // This could save to localStorage or show a modal
  console.log('Save template clicked');
  alert('Template saved! (This would save to your templates collection)');
}
</script>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>