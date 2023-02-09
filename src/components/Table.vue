<script setup lang="ts">
const props = defineProps<{
  rows: Array<any>
  columns: Array<string>
  headers: Array<string>
  currentPage: number
  pageSize: number | string
  totalPages: number
  isLoading: boolean
}>()

defineEmits<{
  (e: 'change-page-size', value: number | string): void
  (e: 'change-page', value: number): void
}>()

const loadingColumns = computed<Array<string>>(() => props.columns.map(column => `loading_${column.key}`))

const { t } = useI18n()
</script>

<template>
  <div class="w-full inline-block align-middle border rounded-lg">
    <table class="w-full">
      <thead class="text-left bg-slate-100 border-b">
        <tr>
          <th v-for="header in headers" :key="header" class="first:pl-6 py-3 text-slate-500 font-normal">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!isLoading && !rows.length">
          <td :colspan="columns.length">
            <slot name="noData">
              {{ t('noData') }}
            </slot>
          </td>
        </tr>
        <tr v-if="isLoading" aria-hidden="true">
          <td
            v-for="loadingColumn in loadingColumns"
            :key="loadingColumn"
            class="p-3"
          >
            <div class="animate-pulse bg-gray-100 w-full p-2" />
          </td>
        </tr>
        <tr
          v-for="(item, index) in rows"
          v-else
          :key="`row_${index}`"
        >
          <td v-for="column in columns" :key="column" class="py-4 border-b">
            <slot :item="item" :name="column">
              {{ item[column] }}
            </slot>
          </td>
        </tr>
        <tr>
          <td colspan="100" class="flex justify-between w-full">
            <div />
            <div>
              <button v-for="page in (currentPage + 2)" :key="`page_${page}`" :class="{ 'bg-blue-50 text-blue-600': currentPage === page }" class="page-btn" @click="$emit('change-page', page)">
                {{ page }}
              </button>
              <span v-if="totalPages > 4">...</span>
              <button class="page-btn">
                {{ totalPages }}
              </button>
            </div>
            <div class="flex items-center">
              Row par page :
              <Dropdown class="ml-2" :options="['25', '50', '100', 'All']" :default-value="pageSize" @change="$emit('change-page-size', $event)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>