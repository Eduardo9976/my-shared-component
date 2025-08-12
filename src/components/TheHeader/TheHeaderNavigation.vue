<template>
  <div class="flex justify-center gap-7">
    <TheHeaderNavigationItem
      v-for="item in items"
      :key="item.label"
      :icon-name="item.iconName"
      :label="item.label"
      :icon-color="iconColor"
    />
  </div>
</template>

<script setup lang="ts">
import TheHeaderNavigationItem from './TheHeaderNavigationItem.vue'
import type {NavigationItem} from '@/types'

interface Props {
  iconColor: string
  items: NavigationItem[]
}

defineProps<Props>()
</script>
