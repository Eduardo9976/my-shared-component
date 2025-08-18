<template>
  <div class="ml-auto flex justify-center gap-6">
    <template
      v-for="(item, index) in filteredNavigationItems"
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
        v-else-if="(item as NavigationItem).visible ?? false"
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
import {computed} from 'vue'

interface Props {
  iconColor: string
}

defineProps<Props>()

const {navigationItems, isSeparator} = useNavigationStore()

const filteredNavigationItems = computed(() => {
  const filtered: (NavigationItem | NavigationSeparatorItem)[] = []
  let lastWasSeparator = false

  for (const item of navigationItems.value) {
    if (isSeparator(item)) {
      if (lastWasSeparator) continue
      filtered.push(item)
      lastWasSeparator = true
    } else if ((item as NavigationItem).visible !== false) {
      filtered.push(item)
      lastWasSeparator = false
    }
  }

  return filtered
})
</script>
