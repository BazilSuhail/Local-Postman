<template>
  <div class="relative">
    <!-- Trigger Button -->
    <button
      @click="isOpen = !isOpen"
      :class="`px-4 py-[6px] rounded-lg border-2 font-semibold text-white transition-colors min-w-28 ${getMethodColor(method)} flex items-center justify-between gap-2`"
    >
      <span>{{ method }}</span>
      <ChevronDownIcon 
        :class="`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`" 
      />
    </button>

    <!-- Floating Menu -->
    <div 
      v-show="isOpen"
      class="absolute z-50 mt-2 w-full min-w-[135px] rounded-lg shadow-lg bg-white border border-gray-200 py-1 space-y-1"
      @click.outside="isOpen = false"
    >
      <button
        v-for="option in methods"
        :key="option"
        @click="selectMethod(option)"
        :class="`w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-2 ${
          method === option 
            ? 'bg-emerald-50 text-emerald-700 font-medium' 
            : 'text-gray-700 hover:bg-gray-50'
        }`"
      >
        <span 
          :class="`w-3 h-3 rounded-full ${getMethodColor(option).split(' ')[0]}`"
        ></span>
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  modelValue: {
    type: String,
    default: 'GET'
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const method = ref(props.modelValue);
const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

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

function selectMethod(selectedMethod) {
  method.value = selectedMethod;
  emit('update:modelValue', selectedMethod);
  isOpen.value = false;
}

// Close menu when clicking outside
function handleClickOutside(event) {
  if (!event.target.closest('.relative')) {
    isOpen.value = false;
  }
}

// Add event listener for outside clicks
document.addEventListener('click', handleClickOutside);

// Clean up event listener
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>