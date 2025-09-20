<template>
  <div
    :class="[
      'bg-gray-900 text-gray-200 h-screen flex flex-col transition-all duration-300 ease-in-out',
      isCollapsed ? 'w-[60px]' : 'w-[245px]'
    ]"
  >
    <!-- Logo + Toggle -->
    <div class="flex items-center justify-between px-4 py-4 border-b border-gray-700">
      <transition name="fade" mode="out-in">
        <span v-if="!isCollapsed" key="logo" class="font-bold text-lg text-green-400 truncate">
          LocalPostman
        </span>
        <span v-else key="icon" class="text-green-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </span>
      </transition>
      
      <button 
        @click="isCollapsed = !isCollapsed" 
        class="p-2 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <ChevronLeftIcon v-if="!isCollapsed" class="h-5 w-5" />
        <ChevronRightIcon v-else class="h-5 w-5" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 mt-6 px-2 space-y-1">
      <router-link
        to="/"
        class="flex items-center px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors"
        active-class="bg-gray-800 text-green-400"
      >
        <HomeIcon class="h-6 w-6 flex-shrink-0" />
        <transition name="slide">
          <span v-if="!isCollapsed" class="ml-3 truncate">API Tester</span>
        </transition>
      </router-link>

      <router-link
        to="/history"
        class="flex items-center px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors"
        active-class="bg-gray-800 text-green-400"
      >
        <ClockIcon class="h-6 w-6 flex-shrink-0" />
        <transition name="slide">
          <span v-if="!isCollapsed" class="ml-3 truncate">History</span>
        </transition>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-700 text-xs text-gray-500">
      <transition name="fade">
        <div v-if="!isCollapsed" class="truncate">
          LocalPostman v1.0
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { HomeIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";

const isCollapsed = ref(false);
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
</style>