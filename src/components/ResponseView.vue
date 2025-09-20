<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-6">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-emerald-100 rounded-lg">
        <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
          </path>
        </svg>
      </div>
      <h2 class="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
        Response
      </h2>
    </div>

    <!-- Loading State -->
    <div v-if="status === 'loading'" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4">
        </div>
        <p class="text-emerald-600 font-medium">Sending request...</p>
      </div>
    </div>

    <!-- Response Content -->
    <div v-else-if="response" class="space-y-6">
      <!-- Status -->
      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div class="flex items-center gap-2">
          <span class="font-medium text-gray-700">Status:</span>
          <span :class="`font-bold ${statusColor(response.status)}`">
            {{ response.status }} {{ response.statusText }}
          </span>
        </div>
        <button @click="copyToClipboard(`${response.status} ${response.statusText}`, 'status')"
          class="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-200"
          title="Copy status">
          <svg v-if="copied === 'status'" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
            </path>
          </svg>
        </button>
      </div>

      <!-- Headers -->
      <div>
        <button @click="toggleSection('responseHeaders')" class="flex items-center justify-between w-full mb-3 group">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
            <h3 class="font-semibold text-gray-700">Response Headers</h3>
            <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              {{ Object.keys(response.headers).length }}
            </span>
          </div>
          <svg :class="`w-4 h-4 transition-transform ${expandedSections.responseHeaders ? 'rotate-180' : ''}`"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <div v-if="expandedSections.responseHeaders" class="relative">
          <pre
            class="bg-gray-50 p-4 rounded-lg text-sm font-mono border max-h-48 overflow-auto">{{ pretty(response.headers) }}</pre>
          <button @click="copyToClipboard(pretty(response.headers), 'responseHeaders')"
            class="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors rounded hover:bg-gray-200"
            title="Copy headers">
            <svg v-if="copied === 'responseHeaders'" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
              </path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Body -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            <h3 class="font-semibold text-gray-700">Response Body</h3>
          </div>
          <div class="flex gap-2">
            <button @click="formatResponse"
              class="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              title="Format JSON">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                </path>
              </svg>
            </button>
            <button @click="copyToClipboard(pretty(response.body), 'responseBody')"
              class="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              title="Copy response">
              <svg v-if="copied === 'responseBody'" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                </path>
              </svg>
            </button>
          </div>
        </div>

        <div class="relative">
          <pre class="bg-gray-900 text-emerald-300 p-4 rounded-lg text-sm font-mono border" :style="{
            maxHeight: isExpanded ? 'none' : '400px',
            overflowX: 'hidden',
            overflowY: isExpanded ? 'visible' : 'auto',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          }">
  {{ pretty(response.body) }}
</pre>

          <!-- Expand/Collapse Button for long responses -->
          <button v-if="isResponseLong" @click="toggleExpanded"
            class="absolute bottom-2 right-2 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-md transition-colors">
            {{ isExpanded ? 'Collapse' : 'Expand' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 text-gray-500">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
          </path>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">No Response Yet</h3>
      <p class="text-gray-500">Response will appear here after sending a request</p>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, computed } from "vue";

const { response, status } = inject("api");

// Local state for UI enhancements
const copied = ref('');
const isExpanded = ref(false);
const expandedSections = ref({
  responseHeaders: false
});

// Computed property to check if response is long
const isResponseLong = computed(() => {
  if (!response.value) return false;
  const responseText = pretty(response.value.body);
  return responseText.split('\n').length > 20 || responseText.length > 1000;
});

function pretty(data) {
  return typeof data === "string" ? data : JSON.stringify(data, null, 2);
}

function statusColor(code) {
  if (!code) return "text-gray-600";
  if (code >= 400) return "text-red-600";
  if (code >= 300) return "text-amber-600";
  return "text-emerald-600";
}

function toggleSection(section) {
  expandedSections.value[section] = !expandedSections.value[section];
}

function toggleExpanded() {
  isExpanded.value = !isExpanded.value;
}

function formatResponse() {
  // This could be extended to format/beautify the response
  console.log('Format response clicked');
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