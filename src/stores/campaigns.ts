import { acceptHMRUpdate, defineStore } from 'pinia'
import { AvailabilityColors, BadgeColor, DefaultColors, StatusColors } from '~/types'

export const useCampaignStore = defineStore('campaign', () => {
  const { t } = useI18n()
  const search = ref<string>('')
  const page = ref<number>(1)
  const pageSize = ref<number | string>(10)
  const helpers = ref(new Array<Helper>())
  const isFetchingHelpers = ref<boolean>(false)
  const headers = [t('Name'), t('Availabilities'), t('Relations'), t('Points'), t('Statuts'), t('Joined on'), '']
  const columns = ['name', 'availability', 'relations', 'points', 'status', 'joinedOn', 'details']

  const filteredHelpers = computed<Array<Helper>>(() => search.value ? Array.from(helpers.value).filter(helper => `${helper.firstname} ${helper.lastname} ${helper.email}`.toLowerCase().includes(search.value.toLowerCase())) : Array.from(helpers.value))
  const paginatedHelpers = computed<Array<Helper>>(() => {
    if (pageSize.value === 'All')
      return filteredHelpers.value

    return filteredHelpers.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
  })
  const totalPages = computed<number>(() => parseInt((filteredHelpers.value.length / pageSize.value).toFixed(0)))

  function fetchHelpers() {
    isFetchingHelpers.value = true
    fetch('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1992974c-eb31-43e3-b119-0b7c400b61ce/data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230208T134734Z&X-Amz-Expires=86400&X-Amz-Signature=d2e07269df48c045aa57fc660c47f037de4c9f920675e01cf55571e8771b83e9&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22data.json%22&x-id=GetObject', {
      headers: { 'Content-type': 'application/json' },
    }).then(res => res.json()).then((response: APIResponse) => {
      helpers.value = response.helpers
    }).catch((error) => {
      console.error(error)
    }).finally(() => {
      isFetchingHelpers.value = false
    })
  }

  function getBadgeColor(type: string, value: string) {
    switch (type) {
      case 'availability':
        return AvailabilityColors[value] || BadgeColor.Unknown
      case 'status':
        return StatusColors[value] || BadgeColor.Unknown

      default:
        return DefaultColors[value] || BadgeColor.Unknown
    }
  }

  return {
    getBadgeColor,
    isFetchingHelpers,
    totalPages,
    headers,
    columns,
    pageSize,
    page,
    paginatedHelpers,
    fetchHelpers,
    search,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCampaignStore, import.meta.hot))
