<script setup lang="ts">
defineProps<{
  options: Array<string>
  defaultValue: string | number
}>()
defineEmits<{
  (e: 'change', value: string): void
}>()
const isOptionsExpanded = ref(false)
const selectedOption = ref('')
</script>

<template>
  <div class="relative ">
    <button
      class="flex items-center justify-between px-2 py-1 bg-white w-full border rounded-lg  focus:outline focus:outline-blue-300 focus:border-gray-900"
      @click="isOptionsExpanded = !isOptionsExpanded"
      @blur="isOptionsExpanded = false"
    >
      <span>{{ selectedOption || defaultValue }}</span>
      <i :class="{ 'i-carbon-chevron-down': isOptionsExpanded, 'i-carbon-chevron-up': !isOptionsExpanded }" />
    </button>
    <transition
      enter-active-class="transform transition duration-500 ease-custom"
      enter-class="-translate-y-1/2 scale-y-0 opacity-0"
      enter-to-class="translate-y-0 scale-y-100 opacity-100"
      leave-active-class="transform transition duration-300 ease-custom"
      leave-class="translate-y-0 scale-y-100 opacity-100"
      leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
    >
      <ul
        v-show="isOptionsExpanded"
        class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden"
      >
        <li
          v-for="(option, index) in options"
          :key="index"
          class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
          @mousedown.prevent="$emit('change', option)"
        >
          {{ option }}
        </li>
      </ul>
    </transition>
  </div>
</template>
