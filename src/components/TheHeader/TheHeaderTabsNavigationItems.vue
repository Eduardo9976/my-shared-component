<template>
  <div ref="el" class="flex flex-col gap-2 p-4">
    <div
      v-for="(item, index) in navigationItemsShallow"
      :key="index"
      class="h-20 bg-gray-500/5 rounded p-3 cursor-move hover:bg-gray-500/10 transition-colors"
    >
      <div v-if="'separator' in item" class="h-px bg-gray-300 w-full"></div>
      <div v-else-if="'label' in item" class="flex items-center gap-2">
        <MeIcon v-if="item.icon" :icon="item.icon" class="text-gray-600" />
        <span class="text-sm font-medium">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useSortable} from '@vueuse/integrations/useSortable'
import {shallowRef, useTemplateRef, watch} from 'vue'
import MeIcon from '@/components/MeIcon/MeIcon.vue'
import type {NavigationItem, NavigationSeparatorItem} from '@/types'
import {useNavigationStore} from '@/composables/useNavigationStore.ts'

const {navigationItems} = useNavigationStore()

const el = useTemplateRef<HTMLElement>('el')

const navigationItemsShallow = shallowRef<
  (NavigationItem | NavigationSeparatorItem)[]
>(navigationItems.value || [])

useSortable(el, navigationItemsShallow, {
  animation: 150,
  ghostClass: 'sortable-ghost',
  chosenClass: 'sortable-chosen',
  dragClass: 'sortable-drag'
  // onUpdate: (evt: any) => {
  //   console.log('Item movido:', {
  //     from: evt.oldIndex,
  //     to: evt.newIndex,
  //     item: navigationItemsShallow.value[evt.newIndex!]
  //   })
  // }
})

watch(
  () => navigationItems.value,
  (newItems: (NavigationItem | NavigationSeparatorItem)[] | undefined) => {
    if (newItems) {
      navigationItemsShallow.value = newItems
    }
  },
  {immediate: true}
)
</script>

<style scoped>
.sortable-ghost {
  opacity: 0.4;
  background-color: #f3f4f6;
}

.sortable-chosen {
  background-color: #e5e7eb;
}

.sortable-drag {
  opacity: 0.8;
  transform: rotate(5deg);
}
</style>
