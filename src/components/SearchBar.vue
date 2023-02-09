<script setup lang="ts">
const campaign = useCampaignStore()
const { t } = useI18n()
</script>

<template>
  <div class="mb-4 max-w-xs ">
    <label for="search" class="sr-only"> {{ t('SearchHelper') }} </label>

    <div class="relative">
      <i class="absolute w-5 h-5 bg-neutral-600 top-1/3 left-3 i-carbon-search" />
      <input
        v-model="campaign.search"
        type="text"
        name="search"
        class="block w-full px-2.5 py-4 pl-10 text-sm border-gray-200 focus:outline-0 rounded-md border"
        :placeholder="t('SearchHelper')"
      >
    </div>
  </div>
</template>
