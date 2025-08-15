<template>
  <div>
    <UInput
      v-model="searchTerm"
      icon="i-lucide-search"
      size="md"
      variant="outline"
      placeholder="Buscar"
      class="mb-3 w-full"
    >
      <template v-if="searchTerm?.length" #trailing>
        <button
          type="button"
          class="inline-flex cursor-pointer items-center justify-center rounded-md p-0 text-sm font-medium transition-colors ring-offset-background size-8 hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          @click="searchTerm = ''"
        >
          <MeIcon icon="me-icon-l icon-xmark" />
        </button>
      </template>
    </UInput>

    <div class="overflow-y-auto max-h-[280px]">
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
            <div
              v-for="(childItem, childIndex) in item.children"
              :key="childIndex"
              class="cursor-pointer rounded-md p-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
              @click="handleItemClick(childItem)"
            >
              {{ childItem.description }}
            </div>
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
import {useNavigationStore} from '@/composables/useNavigationStore.ts'

const {siteMapItems} = useNavigationStore()

const searchTerm = ref('')

const normalize = (text: string) => text.trim().toLowerCase()

const matchesSearch = (item: SiteMapItem, term: string): boolean => {
  if (!term) return true
  if (normalize(item.description).includes(term)) return true
  return item.children?.some(child => matchesSearch(child, term)) ?? false
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
  if (!siteMapItems.value) return []
  const term = normalize(searchTerm.value)
  return term ? filterSiteMap(siteMapItems.value, term) : siteMapItems.value
})

const accordionItems = computed(() => {
  return filteredSiteMap.value.map((section, index) => ({
    label: section.description,
    value: `section-${index}`,
    children: section.children
  }))
})

const handleItemClick = (item: SiteMapItem) => {
  if (item.url) {
    window.open(item.url, '_self')
  }
}
</script>
