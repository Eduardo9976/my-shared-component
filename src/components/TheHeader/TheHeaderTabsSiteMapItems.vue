<template>
  <div>
    <UInput
      v-model="searchTerm"
      icon="i-lucide-search"
      size="md"
      variant="outline"
      :placeholder="t('theHeader.tabs.siteMapItems.search')"
      class="mb-3 w-full"
    >
      <template v-if="searchTerm" #trailing>
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50"
          @click="searchTerm = ''"
        >
          <MeIcon icon="me-icon-l icon-xmark" />
        </button>
      </template>
    </UInput>

    <div class="max-h-[280px] overflow-y-auto">
      <UAccordion
        type="multiple"
        :items="accordionItems"
        class="w-full pr-2"
        :ui="{
          item: 'border-none',
          header: 'border-none',
          trigger: 'border-none'
        }"
      >
        <template #content="{item}">
          <div class="space-y-2">
            <a
              v-for="(child, idx) in item.children"
              :key="idx"
              :href="child.url || '#'"
              :target="child.url ? getTarget(child.url) : undefined"
              class="block cursor-pointer rounded-md p-2 text-sm text-gray-600 no-underline transition-colors hover:bg-gray-100 hover:text-gray-800"
              @click.prevent.stop="() => handleClick(child)"
            >
              {{ child.description }}
            </a>
          </div>
        </template>
      </UAccordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import MeIcon from '@/components/MeIcon/MeIcon.vue'
import type {SiteMapItem} from '@/types'
import {isExternalUrl} from '@/utils/isExternalUrl'
import {useTranslations} from '@/composables/useTranslations/useTranslations.ts'

const {t} = useTranslations()

interface Props {
  siteMapItems?: SiteMapItem[]
}

const props = defineProps<Props>()

const searchTerm = ref('')

const normalize = (text: string) => text.trim().toLowerCase()

const matchesSearch = (item: SiteMapItem, term: string): boolean => {
  if (!term) return true
  return (
    normalize(item.description).includes(term) ||
    item.children?.some(child => matchesSearch(child, term)) ||
    false
  )
}

const filterSiteMap = (items: SiteMapItem[], term: string): SiteMapItem[] =>
  items
    .map(section => {
      const matchingChildren = section.children.filter(child =>
        matchesSearch(child, term)
      )
      if (matchingChildren.length) {
        return {...section, children: matchingChildren}
      }
      return matchesSearch(section, term) ? section : null
    })
    .filter((section): section is SiteMapItem => section !== null)

const filteredSiteMap = computed(() => {
  if (!props.siteMapItems) return []
  const term = normalize(searchTerm.value)
  return term ? filterSiteMap(props.siteMapItems, term) : props.siteMapItems
})

const accordionItems = computed(() =>
  filteredSiteMap.value.map((section, index) => ({
    label: section.description,
    value: `section-${index}`,
    children: section.children
  }))
)

const getTarget = (url: string) => (isExternalUrl(url) ? '_blank' : '_self')

function handleClick(item: SiteMapItem) {
  item?.click?.(item)
}
</script>
