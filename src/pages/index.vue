<script setup lang="ts">
const campaign = useCampaignStore()

function showDetail(data) {
  alert(`Details of ${data.firstname} ${data.lastname}`)
}
onMounted(() => {
  campaign.fetchHelpers()
})
</script>

<template>
  <div class=" p-10 ">
    <SearchBar />
    <Table
      :rows="campaign.paginatedHelpers"
      :columns="campaign.columns"
      :headers="campaign.headers"
      :current-page="campaign.page"
      :total-pages="campaign.totalPages"
      :page-size="campaign.pageSize"
      :is-loading="campaign.isFetchingHelpers"
      @change-page="campaign.page = $event"
      @change-page-size="campaign.pageSize = $event"
    >
      <template #name="{ item }">
        <div class="flex items-center ml-6">
          <img v-if="item.profilePictureUrl" class="w-8 h-8 rounded-full" :src="item.profilePictureUrl">
          <div class="ml-2 flex flex-col">
            <span class="font-sm font-semibold ">{{ item.firstname }} {{ item.lastname }}</span>
            <span class="text-slate-500">{{ item.email }}</span>
          </div>
        </div>
      </template>
      <template #availability="{ item }">
        <Badge with-dot :color="campaign.getBadgeColor('availability', item.availability)" :label="item.availability" />
      </template>
      <template #status="{ item }">
        <Badge :color="campaign.getBadgeColor('status', item.status)" :label="item.status" />
      </template>
      <template #joinedOn="{ item }">
        {{ new Date(item.joinedOn).toLocaleDateString() }}
      </template>
      <template #details="{ item }">
        <button class="text-blue-600 font-medium" @click="showDetail(item)">
          Details
        </button>
      </template>
    </Table>
  </div>
</template>

<route lang="yaml">
meta:
  layout: back
</route>
