<template>
  <div>
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="p-2 bg-emerald-100 rounded-lg">
            <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
            Request History
          </h1>
        </div>
        <p class="text-gray-600 ml-11">Track and manage your API request history</p>
      </div>

      <!-- Search and Filter Controls -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Search -->
          <div class="relative flex-1">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search requests..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <!-- Method Filter -->
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
            <select
              v-model="filterMethod"
              class="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white min-w-32"
            >
              <option value="">All Methods</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>

          <!-- Clear All Button -->
          <button
            @click="clearAllHistory"
            :disabled="history.length === 0"
            class="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Clear All
          </button>
        </div>
      </div>

      <!-- Request History List -->
      <div v-if="filteredHistory.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
        <p class="text-gray-500">
          {{ searchTerm || filterMethod ? 'Try adjusting your search or filter criteria' : 'Your request history will appear here' }}
        </p>
      </div>

      <ul v-else class="space-y-3">
        <li
          v-for="(item, index) in filteredHistory"
          :key="index"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 group"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4 flex-1 min-w-0">
              <!-- Method Badge -->
              <div :class="`px-3 py-1 rounded-full text-sm font-semibold border ${getMethodColor(item.method)}`">
                {{ item.method }}
              </div>
              
              <!-- URL -->
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                </svg>
                <span class="text-gray-900 font-medium truncate">{{ item.url }}</span>
              </div>
              
              <!-- Auth/File Indicators -->
              <div class="flex items-center gap-2">
                <div v-if="item.hasAuth" class="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  Auth
                </div>
                <div v-if="item.hasFile" class="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  File
                </div>
              </div>
            </div>

            <!-- Date and Actions -->
            <div class="flex items-center gap-4 ml-4">
              <div class="text-right">
                <div class="text-sm text-gray-500">
                  {{ formatDate(item.date) }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ formatTime(item.date) }}
                </div>
              </div>
              
              <!-- Delete Individual Button -->
              <button
                @click="deleteHistoryItem(index)"
                class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete this request"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </li>
      </ul>

      <!-- Stats Footer -->
      <div v-if="history.length > 0" class="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-center gap-8 text-sm text-gray-600">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>Total Requests: {{ history.length }}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Showing: {{ filteredHistory.length }}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>With Auth: {{ history.filter(h => h.hasAuth).length }}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>With Files: {{ history.filter(h => h.hasFile).length }}</span>
          </div>
        </div>
      </div>
  
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Reactive data
const history = ref([]);
const searchTerm = ref('');
const filterMethod = ref('');

// Load history from localStorage on component mount
onMounted(() => {
  history.value = JSON.parse(localStorage.getItem("history") || "[]");
});

// Computed property for filtered history
const filteredHistory = computed(() => {
  return history.value.filter(item => {
    const matchesSearch = item.url.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         item.method.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesFilter = !filterMethod.value || item.method === filterMethod.value;
    return matchesSearch && matchesFilter;
  });
});

// Method to get color classes for HTTP methods
const getMethodColor = (method) => {
  const colors = {
    'GET': 'bg-blue-100 text-blue-800 border-blue-200',
    'POST': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'PUT': 'bg-amber-100 text-amber-800 border-amber-200',
    'DELETE': 'bg-red-100 text-red-800 border-red-200',
    'PATCH': 'bg-purple-100 text-purple-800 border-purple-200'
  };
  return colors[method] || 'bg-gray-100 text-gray-800 border-gray-200';
};

// Method to clear all history
const clearAllHistory = () => {
  history.value = [];
  localStorage.setItem("history", JSON.stringify([]));
};

// Method to delete individual history item
const deleteHistoryItem = (index) => {
  // Find the actual index in the original history array
  const itemToDelete = filteredHistory.value[index];
  const originalIndex = history.value.findIndex(item => 
    item.method === itemToDelete.method && 
    item.url === itemToDelete.url && 
    item.date === itemToDelete.date
  );
  
  if (originalIndex !== -1) {
    history.value.splice(originalIndex, 1);
    localStorage.setItem("history", JSON.stringify(history.value));
  }
};

// Helper methods for date formatting
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString();
};
</script>

<style scoped>
/* Additional custom styles if needed */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>