<template>
  <div class="p-4 w-[384px]">
    <UTabs
      :items="items"
      class="w-full"
      size="xs"
      variant="pill"
      color="neutral"
      :ui="{
        list: 'grid grid-cols-2 w-full',
        trigger:
          'flex-1 text-center cursor-pointer data-[state=active]:bg-white data-[state=active]:text-gray-900 focus:outline-none focus-visible:outline-none',
        indicator: 'bg-white'
      }"
    >
      <template #navigationItems>
        <TheHeaderTabsNavigationItems />
      </template>

      <template #siteMapItems>
        <TheHeaderTabsSiteMapItems />
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {TabsItem} from '@nuxt/ui'
import TheHeaderTabsSiteMapItems from '@/components/TheHeader/TheHeaderTabsSiteMapItems.vue'
import TheHeaderTabsNavigationItems from '@/components/TheHeader/TheHeaderTabsNavigationItems.vue'

const items = ref<TabsItem[]>([
  {
    label: 'Apps',
    slot: 'navigationItems' as const
  },
  {
    label: 'Outras funcionalidades',
    slot: 'siteMapItems' as const
  }
])
</script>
