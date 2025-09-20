<template>
  <div
    :class="[
      'bg-white text-gray-800 h-screen flex flex-col transition-all duration-300 ease-in-out border-r border-emerald-100',
      isCollapsed ? 'w-[75px]' : 'w-[245px]'
    ]"
  >
    <!-- Logo + Toggle -->
    <div class="flex items-center justify-between px-4 py-4 border-b border-emerald-100">
      <transition name="fade" mode="out-in">
        <div v-if="!isCollapsed" key="logo" class="font-bold text-lg text-emerald-600 truncate">
          Axon Client
        </div>
      </transition>
      
      <button 
        @click="isCollapsed = !isCollapsed" 
        :class="[
          'p-1 rounded-md hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1',
          isCollapsed ? 'mx-auto' : ''
        ]"
        :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <ChevronLeftIcon v-if="!isCollapsed" class="h-5 w-5 text-emerald-700" />
        <ChevronRightIcon v-else class="h-5 w-5 text-emerald-700" />
      </button>
    </div>

    <div v-if="isCollapsed" key="logo" class="font-bold mx-auto text-lg text-emerald-600 truncate">
      <div key="icon" class="text-emerald-600 flex items-center justify-center w-6 mt-2">
        <DocumentDuplicateIcon class="h-6 w-6" />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 mt-6 px-2 space-y-1">
      <router-link
        to="/"
        class="flex items-center px-4 py-3 hover:bg-emerald-100 rounded-lg transition-colors"
        active-class="bg-emerald-100 text-emerald-700 font-medium"
      >
        <HomeIcon class="h-5 w-5 flex-shrink-0" />
        <transition name="slide">
          <span v-if="!isCollapsed" class="ml-3 truncate">API Tester</span>
        </transition>
      </router-link>

      <router-link
        to="/history"
        class="flex items-center px-4 py-3 hover:bg-emerald-100 rounded-lg transition-colors"
        active-class="bg-emerald-100 text-emerald-700 font-medium"
      >
        <ClockIcon class="h-5 w-5 flex-shrink-0" />
        <transition name="slide">
          <span v-if="!isCollapsed" class="ml-3 truncate">History</span>
        </transition>
      </router-link>
    </nav>

    <!-- History Section -->
    <div v-if="!isCollapsed" class="flex-1 px-2 pb-4">
      <div class="bg-emerald-50 rounded-lg p-3 h-full">
        <h3 class="text-sm font-medium text-emerald-800 mb-3">Recent History</h3>
        <div class="space-y-2 h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-200">
          <div
            v-for="(item, index) in recentHistory"
            :key="index"
            class="bg-white rounded-md p-2 border border-emerald-100 hover:border-emerald-200 transition-colors cursor-pointer"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-emerald-700">{{ item.method }}</span>
              <span class="text-xs text-gray-500">{{ formatTime(item.date) }}</span>
            </div>
            <p class="text-xs text-gray-600 truncate mt-1">{{ item.url }}</p>
          </div>
        </div>
        <div class="mt-3 text-center">
          <router-link 
            to="/history" 
            class="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View All
          </router-link>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-4 border-t border-emerald-100 text-xs text-emerald-700">
      <transition name="fade">
        <div v-if="!isCollapsed" class="truncate">
          Axon Client v1.0
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { HomeIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon, DocumentDuplicateIcon } from "@heroicons/vue/24/outline"

const isCollapsed = ref(false)
const recentHistory = ref([])

onMounted(() => {
  // Load history from localStorage
  const historyData = JSON.parse(localStorage.getItem("history") || "[]")
  // Show only the 5 most recent items
  recentHistory.value = historyData.slice(0, 5)
})

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-emerald-200::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thumb-emerald-200::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thumb-emerald-200::-webkit-scrollbar-thumb {
  background-color: #a7f3d0;
  border-radius: 2px;
}

.scrollbar-thumb-emerald-200::-webkit-scrollbar-thumb:hover {
  background-color: #86efac;
}
</style>