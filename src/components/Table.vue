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
          <td class="p-3 text-center w-full border-b" :colspan="columns.length">
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
          <td colspan="100" class="table-cell justify-between w-full">
            <div class="flex justify-between">
              <div />
              <div>
                <Pagination :current="currentPage" :per-page="pageSize" :total="totalPages" @change-page="$emit('change-page', $event)" />
              </div>
              <div class="flex items-center mr-2 text-slate-600">
                Row par page :
                <Dropdown class="ml-2" :options="['10', '25', '50', '100', 'All']" :default-value="pageSize" @change="$emit('change-page-size', $event)" />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
