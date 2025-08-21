<template>
  <div v-if="siteMap" class="relative flex">
    <UPopover
      :open="isOpen"
      :ui="{
        content: 'z-[10001]',
        arrow: 'z-[10001]'
      }"
      mode="click"
      arrow
      @update:open="handlePopoverUpdate"
    >
      <TheHeaderNavigationItemContent v-bind="$props" />

      <template #content>
        <TheHeaderTabs :siteMapItems="siteMapItems" />
      </template>
    </UPopover>
  </div>

  <TheHeaderNavigationItemContent v-else v-bind="$props" />
</template>

<script setup lang="ts">
import {ref, inject, watch} from 'vue'
import TheHeaderNavigationItemContent from './TheHeaderNavigationItemContent.vue'
import type {NavigationItem, SiteMapItem} from '@/types'

interface Props extends NavigationItem {
  iconColor: string
  siteMapItems?: SiteMapItem[]
}

interface HeaderBackdrop {
  show: (zIndex?: number) => void
  close: () => void
  state: {visible: boolean; zIndex: number}
}

defineProps<Props>()

const isOpen = ref(false)

const headerBackdrop = inject<HeaderBackdrop>('headerBackdrop')

function handlePopoverUpdate(open: boolean) {
  isOpen.value = open

  if (open) {
    headerBackdrop?.show(9999)
  } else {
    headerBackdrop?.close()
  }
}

watch(isOpen, (newValue, oldValue) => {
  if (oldValue && !newValue) {
    headerBackdrop?.close()
  }
})
</script>
