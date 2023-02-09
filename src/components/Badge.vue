<script setup lang="ts">
import { BadgeColor } from '~/types'
defineProps<{
  label: string
  color: BadgeColor
  withDot?: boolean
}>()
</script>

<template>
  <span
    :class="{
      'bg-green-100 text-green-800': color === BadgeColor.Valid,
      'bg-orange-100 text-orange-800': color === BadgeColor.Warning,
      'bg-red-100 text-red-800': color === BadgeColor.Invalid,
      'bg-blue-100 text-blue-800': color === BadgeColor.Info,
    }"
    class="rounded-full px-1.5 py-0.5 inline-flex items-center capitalize"
  >
    <i
      v-if="withDot" :class="{
        'bg-green-800': color === BadgeColor.Valid,
        'bg-orange-800': color === BadgeColor.Warning,
        'bg-red-800': color === BadgeColor.Invalid,
        'bg-blue-800': color === BadgeColor.Info,
      }" class="bg-green-800 w-2 h-2 i-carbon-dot-mark mr-0.5"
    />
    {{ label }}
  </span>
</template>
