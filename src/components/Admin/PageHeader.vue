<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="sticky top-0 border-b p-8 bg-white z-2">
    <div class="mb-6">
      <span class="text-slate-600">{{ t('Campaigns') }}</span>
      <span class="text-slate-400">/ {{ t('ProductRecruitment') }}</span>
    </div>
    <div class="flex justify-between">
      <div class="flex">
        <span class="font-bold text-2xl mr-4">{{ t('ProductRecruitment') }}</span>
        <Badge color="valid" :label="t('Published')" />
      </div>
      <button class="rounded-full border border-neutral-200 px-4 py-2">
        <i class="i-carbon-edit" />
        {{ t('EditCampaign') }}
      </button>
    </div>
  </div>
</template>
