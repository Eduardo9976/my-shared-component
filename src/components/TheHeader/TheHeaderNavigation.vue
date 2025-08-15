<template>
  <div class="ml-auto flex justify-center gap-6">
    <template
      v-for="(item, index) in navigationItems"
      :key="
        isSeparator(item)
          ? `separator-${index}`
          : (item as NavigationItem).label
      "
    >
      <div
        v-if="isSeparator(item)"
        class="my-2 border-l"
        :style="{borderColor: iconColor}"
      />

      <TheHeaderNavigationItem
        v-else
        v-bind="item as NavigationItem"
        :iconColor="iconColor"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import TheHeaderNavigationItem from './TheHeaderNavigationItem.vue'
import type {NavigationItem, NavigationSeparatorItem} from '@/types'
import {useNavigationStore} from '@/composables/useNavigationStore.ts'

interface Props {
  iconColor: string
}

defineProps<Props>()

const {navigationItems} = useNavigationStore()

function isSeparator(
  item: NavigationItem | NavigationSeparatorItem
): item is NavigationSeparatorItem {
  return 'separator' in item && item.separator === true
}
</script>
