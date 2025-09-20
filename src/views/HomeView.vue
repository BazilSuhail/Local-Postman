<template>
  <div>
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="p-3 bg-emerald-100 rounded-xl">
            <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              API Tester Pro
            </h1>
            <p class="text-gray-600 text-lg">Test and debug your API endpoints with professional tools</p>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <!-- <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-xl p-4 border-[2px] border-gray-200 ">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Status</p>
              <p class="font-semibold text-gray-900">
                {{ status === 'loading' ? 'Sending...' : status === 'done' ? 'Ready' : 'Ready' }}
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-4 border-[2px] border-gray-200 ">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-emerald-100 rounded-lg">
              <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Method</p>
              <p class="font-semibold text-gray-900">{{ method }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-4 border-[2px] border-gray-200 ">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Auth</p>
              <p class="font-semibold text-gray-900">
                {{ enableAuth ? 'Enabled' : 'Disabled' }}
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-4 border-[2px] border-gray-200 ">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-amber-100 rounded-lg">
              <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Last Response</p>
              <p :class="`font-semibold ${getStatusColor(response?.status)}`">
                {{ response ? `${response.status} ${response.statusText}` : 'None' }}
              </p>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Request Form -->
        <div class="space-y-6">
          <RequestForm />
        </div>
        
        <!-- Response View -->
        <div class="space-y-6">
          <ResponseView />
          
          <!-- Quick Actions -->
          <div class="bg-white rounded-xl  border-[2px] border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div class="grid grid-cols-2 gap-3">
              <button 
                @click="clearAll"
                class="flex items-center justify-center gap-2 p-3 border-[2px] border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                <span class="text-sm font-medium text-gray-700">Clear All</span>
              </button>
              
              <button 
                @click="exportConfig"
                class="flex items-center justify-center gap-2 p-3 border-[2px] border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span class="text-sm font-medium text-gray-700">Export</span>
              </button>
              
              <button 
                @click="saveTemplate"
                class="flex items-center justify-center gap-2 p-3 border-[2px] border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                </svg>
                <span class="text-sm font-medium text-gray-700">Save Template</span>
              </button>
              
              <button 
                @click="viewHistory"
                class="flex items-center justify-center gap-2 p-3 border border-emerald-200 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-sm font-medium text-emerald-700">View History</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
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

function viewHistory() {
  // This could navigate to history page or show a modal
  console.log('View history clicked');
  alert('Navigating to history... (This would show the history page)');
}
</script>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>