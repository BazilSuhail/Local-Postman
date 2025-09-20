<template>
  <div :class="[
    'bg-white sticky top-0 text-gray-800 flex flex-col transition-all duration-300 ease-in-out border-r border-gray-300 rounded-r-[6px] ',
    isCollapsed ? 'w-[75px]' : 'w-[285px]'
  ]" class="h-screen">
    <!-- Logo + Toggle -->
    <div class="flex items-center justify-between px-4 py-4 border-b border-emerald-100 flex-shrink-0">
      <transition name="fade" mode="out-in">
        <div v-if="!isCollapsed" key="logo" class="font-bold text-xl text-emerald-700 truncate flex items-center">
          <BeakerIcon class="h-6 w-6 mr-2 text-emerald-600" />
          Axon Client
        </div>
      </transition>

      <button @click="isCollapsed = !isCollapsed" :class="[
        'p-1.5 rounded-full hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1',
        isCollapsed ? 'mx-auto' : ''
      ]" :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
        <ChevronLeftIcon v-if="!isCollapsed" class="h-5 w-5 text-emerald-700" />
        <ChevronRightIcon v-else class="h-5 w-5 text-emerald-700" />
      </button>
    </div>

    <div v-if="isCollapsed" class="flex justify-center mt-3 flex-shrink-0">
      <div class="bg-emerald-500 rounded-lg p-2">
        <BeakerIcon class="h-6 w-6 text-white" />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 flex flex-col mt-6 px-2 overflow-hidden">
      <router-link to="/"
        class="flex items-center px-4 py-3 hover:bg-emerald-100 rounded-lg transition-colors group flex-shrink-0"
        active-class="bg-emerald-100 text-emerald-700 font-medium">
        <HomeIcon class="h-5 w-5 flex-shrink-0 text-emerald-600 group-hover:text-emerald-700" />
        <transition name="slide">
          <span v-if="!isCollapsed" class="ml-3 truncate">API Tester</span>
        </transition>
      </router-link>

      <router-link to="/history"
        class="flex items-center px-4 py-3 hover:bg-emerald-100 rounded-lg transition-colors group flex-shrink-0"
        active-class="bg-emerald-100 text-emerald-700 font-medium">
        <ClockIcon class="h-5 w-5 flex-shrink-0 text-emerald-600 group-hover:text-emerald-700" />
        <transition name="slide">
          <span v-if="!isCollapsed" class="ml-3 truncate">History</span>
        </transition>
      </router-link>

      <!-- History Section -->
      <div v-if="!isCollapsed" class="flex-1 mt-5 overflow-hidden flex flex-col">
        <div class="bg-gray-50 flex-1 rounded-xl px-1 py-4 border border-emerald-100 flex flex-col"
          style="height: calc(100vh - 200px);">
          <h3 class="text-sm mx-3 font-semibold text-emerald-800 mb-3 flex items-center flex-shrink-0">
            <ClockIcon class="h-4 w-4 mr-1.5" />
            Recent History
          </h3>
          <div class="flex-1 min-h-0 overflow-hidden">
            <div class="h-full overflow-y-auto pr-1 scrollbar-hidden">
              <div v-for="(item, index) in recentHistory" :key="index"
                class="bg-white rounded-lg p-3 border border-emerald-100 hover:border-emerald-300 transition-all cursor-pointer shadow-sm hover:shadow mb-2 last:mb-0"
                @click="loadHistoryItem(item)">
                <div class="">
                  <div class="flex items-center">
                    <span :class="getMethodCircleClass(item.method)" class="w-3 h-3 rounded-full mr-2"></span>
                    <span class="text-xs text-gray-600 truncate">{{ formatUrl(item.url) }}</span>
                  </div>
                  <p class="mt-[5px] text-xs text-gray-500">{{ formatTime(item.date) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3 text-center flex-shrink-0">
            <router-link to="/history"
              class="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center justify-center">
              View All
              <ArrowRightIcon class="h-3.5 w-3.5 ml-1" />
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-emerald-100 text-xs text-emerald-700 flex-shrink-0">
      <transition name="fade">
        <div v-if="!isCollapsed" class="truncate flex items-center">
          <Cog6ToothIcon class="h-4 w-4 mr-1.5 text-emerald-500" />
          Axon Client v1.0
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  HomeIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BeakerIcon,
  ArrowRightIcon,
  Cog6ToothIcon
} from "@heroicons/vue/24/outline"

const isCollapsed = ref(false)
const recentHistory = ref([])

onMounted(() => {
  // Load history from localStorage
  const historyData = JSON.parse(localStorage.getItem("history") || "[]")
  // Show only the 5 most recent items
  recentHistory.value = historyData
})

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatUrl = (url) => {
  // Remove protocol (http:// or https://) from the beginning
  return url.replace(/^https?:\/\//, '')
}

const getMethodCircleClass = (method) => {
  const classes = {
    GET: 'bg-emerald-500',
    POST: 'bg-blue-500',
    PUT: 'bg-amber-500',
    PATCH: 'bg-purple-500',
    DELETE: 'bg-rose-500'
  }
  return classes[method] || 'bg-gray-500'
}

const loadHistoryItem = (item) => {
  // Implement history item loading logic
  console.log('Loading history item:', item)
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

/* Hide scrollbar while maintaining functionality */
.scrollbar-hidden {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

/* Ensure the entire sidebar takes full height */
.h-screen {
  height: 100vh;
}
</style>