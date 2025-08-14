<template>
  <div class="p-4 max-w-[384px] w-[384px]">
    <UTabs
      :items="items"
      class="w-full"
      size="xs"
      variant="pill"
      color="neutral"
      :ui="{
        list: 'grid grid-cols-2 w-full',
        trigger: 'flex-1 text-center cursor-pointer data-[state=active]:bg-white data-[state=active]:text-gray-900 focus:outline-none focus-visible:outline-none',
        indicator: 'bg-white'
      }"
    >
      <template #apps>
        <div class="p-4">
          <p>Apps content goes here.</p>
        </div>
      </template>

      <template #others>
        <div class="p-4">
          <p>Other functionalities content goes here.</p>
        </div>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsItem } from '@nuxt/ui'

const items = ref<TabsItem[]>([
  {
    label: 'Apps',
    slot: 'apps' as const
  },
  {
    label: 'Outras funcionalidades',
    slot: 'others' as const
  }
])
</script>
