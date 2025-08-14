<template>
  <div class="flex justify-center gap-6 ml-auto">
    <template
      v-for="(item, index) in items"
      :key="isSeparator(item) ? `separator-${index}` : item.label"
    >
      <div
        v-if="isSeparator(item)"
        class="border-l my-2"
        :style="{borderColor: iconColor}"
      />

      <TheHeaderNavigationItem v-else v-bind="{...item, iconColor}" />
    </template>
  </div>
</template>

<script setup lang="ts">
import TheHeaderNavigationItem from './TheHeaderNavigationItem.vue'
import type {NavigationItem, NavigationSeparatorItem} from '@/types'

interface Props {
  iconColor: string
  items: (NavigationItem | NavigationSeparatorItem)[]
}

defineProps<Props>()

function isSeparator(
  item: NavigationItem | NavigationSeparatorItem
): item is NavigationSeparatorItem {
  return 'separator' in item && item.separator === true
}
</script>
