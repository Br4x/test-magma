<script setup lang="ts">
const props = defineProps<{
  current: Number
  total: Number
  perPage: Number
}>()
const emit = defineEmits<{
  (e: 'change-page', page: number): void
}>()

const pageRange = 2

const rangeStart = computed(() =>
  props.current - pageRange > 0 ? props.current - pageRange : 1,
)
const totalPages = computed(() => Math.ceil(props.total / props.perPage))
const rangeEnd = computed(() => {
  if (props.current + pageRange.value < totalPages.value)
    return props.current + pageRange.value

  return totalPages.value
})

const nextPage = computed(() => Math.ceil(props.total / props.perPage))
const prevPage = computed(() => Math.ceil(props.total / props.perPage))
const hasFirst = computed(() => rangeStart.value !== 1)
const hasLast = computed(() => rangeEnd.value < totalPages.value)
const hasPrev = computed(() => props.current > 1)
const hasNext = computed(() => props.current < totalPages.value)
const pages = computed(() => {
  const pages = []
  for (let i = rangeStart.value; i <= rangeEnd.value; i++) pages.push(i)

  return pages
})

function changePage(page: number) {
  if (page > 0 && page <= totalPages.value)
    emit('change-page', page)
}
</script>

<template>
  <div class="min-w-max">
    <section
      class="flex justify-between bg-white rounded-lg px-10 py-3 text-gray-700"
    >
      <ul class="flex items-center">
        <li v-if="hasPrev" class="pr-6">
          <button @click="changePage(prevPage)">
            <i class="i-carbon-chevron-left flex h-5 w-5" />
          </button>
        </li>
        <li v-if="hasFirst" class="pr-6">
          <button
            class="
              flex
              hover:bg-gray-200
              rounded-full
              h-8
              w-8
              items-center
              justify-center
            "
            @click.prevent="changePage(1)"
          >
            1
          </button>
        </li>
        <li v-if="hasFirst" class="pr-6">
          ...
        </li>
        <li v-for="page in pages" :key="`page_${page}`" class="pr-6">
          <button
            :class="{
              'bg-blue-50 text-blue-600': current === page,
            }"
            class="
              flex
              hover:bg-gray-200
              rounded-full
              h-8
              w-8
              items-center
              justify-center
            "
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </li>
        <li v-if="hasLast" class="pr-6">
          ...
        </li>
        <li v-if="hasLast" class="pr-6">
          <button
            class="
                flex
                hover:bg-gray-200
                rounded-md
                h-8
                w-8
                items-center
                justify-center
              " @click="changePage(totalPages)"
          >
            {{ totalPages }}
          </button>
        </li>
        <li v-if="hasNext" class="pr-6">
          <button @click.prevent="changePage(nextPage)">
            <i class="i-carbon-chevron-right flex h-5 w-5" />
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>
