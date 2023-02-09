<script lang="ts">
const props = defineProps<{
  current: {
    type: Number
    default: 1
  }
  total: {
    type: Number
    default: 0
  }
  perPage: {
    type: Number
    default: 9
  }
  pageRange: {
    type: Number
    default: 2
  }
  textBeforeInput: {
    type: String
    default: 'Go to page'
  }
  textAfterInput: {
    type: String
    default: 'Go'
  }
}>()
const pages = computed(() => {
  const pages = []

  for (let i = rangeStart; i <= rangeEnd; i++)
    pages.push(i)

  return pages
})

const rangeStart = computed(() => (props.current - props.pageRange > 0) ? props.current - props.pageRange : 1)
const rangeEnd = computed(() => (props.current + props.pageRange < totalPages) ? props.current + props.pageRange : totalPages)
const totalPages = computed(() => Math.ceil(props.total / props.perPage))
const nextPage = computed(() => Math.ceil(props.total / props.perPage))
const prevPage = computed(() => Math.ceil(props.total / props.perPage))
const hasFirst = computed(() => props.rangeStart !== 1)
const hasLast = computed(() => props.rangeEnd < props.totalPages)
const hasPrev = computed(() => props.current > 1)
const hasNext = computed(() => props.current < props.totalPages)

function changePage(page) {
  if (page > 0 && page <= props.totalPages)
    emit('page-changed', page)
}
defineEmits<{
  (e: 'page-changed', page: number): void
}>()
</script>

<template>
  <div class="min-w-max">
    <section
      class="
        flex
        justify-between
        bg-white
        rounded-lg
        border border-gray-200
        px-10
        py-3
        text-gray-700
        font-montserrat
      "
    >
      <ul class="flex items-center">
        <li v-if="hasPrev()" class="pr-6">
          <a href="#" @click.prevent="changePage(prevPage)">
            <div
              class="
                flex
                items-center
                justify-center
                hover:bg-gray-200
                rounded-md
                transform
                rotate-45
                h-6
                w-6
              "
            >
              <div class="transform -rotate-45">
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
            </div>
          </a>
        </li>
        <li v-if="hasFirst()" class="pr-6">
          <a href="#" @click.prevent="changePage(1)">
            <div
              class="
                flex
                hover:bg-gray-200
                rounded-md
                transform
                rotate-45
                h-6
                w-6
                items-center
                justify-center
              "
            >
              <span class="transform -rotate-45"> 1 </span>
            </div>
          </a>
        </li>
        <li v-if="hasFirst()" class="pr-6">
          ...
        </li>
        <li v-for="page in pages" :key="`page_${page}`" class="pr-6">
          <a href="#" @click.prevent="changePage(page)">
            <div
              :class="{
                'bg-gradient-to-r from-blue-400 to-indigo-400': current === page,
              }"
              class="
                flex
                hover:bg-gray-200
                rounded-md
                transform
                rotate-45
                h-6
                w-6
                items-center
                justify-center
              "
            >
              <span class="transform -rotate-45">{{ page }}</span>
            </div>
          </a>
        </li>
        <li v-if="hasLast()" class="pr-6">
          ...
        </li>
        <li v-if="hasLast()" class="pr-6">
          <a href="#" @click.prevent="changePage(totalPages)">
            <div
              class="
                flex
                hover:bg-gray-200
                rounded-md
                transform
                rotate-45
                h-6
                w-6
                items-center
                justify-center
              "
            >
              <span class="transform -rotate-45">
                {{ totalPages }}
              </span>
            </div>
          </a>
        </li>
        <li v-if="hasNext()" class="pr-6">
          <a href="#" @click.prevent="changePage(nextPage)">
            <div
              class="
                flex
                items-center
                justify-center
                hover:bg-gray-200
                rounded-md
                transform
                rotate-45
                h-6
                w-6
              "
            >
              <div class="transform -rotate-45">
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </a>
        </li>
      </ul>

      <div class="flex items-center">
        <div class="pr-2 text-gray-400 font-medium">
          <span id="text-before-input">
            {{ textBeforeInput }}
          </span>
        </div>
        <div class="w-14 rounded-md border border-indigo-400 px-1 py-1">
          <input
            v-model.number="input"
            class="w-12 focus:outline-none px-2"
            type="text"
          >
        </div>
        <div
          class="flex items-center pl-4 font-medium cursor-pointer"
          @click.prevent="changePage(input)"
        >
          <span id="text-after-input">
            {{ textAfterInput }}
          </span>
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </section>
  </div>
</template>

  <style scoped>
</style>
