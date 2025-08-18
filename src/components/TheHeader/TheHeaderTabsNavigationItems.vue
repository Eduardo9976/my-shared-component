<template>
  <div ref="el" class="flex flex-col">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="hover:bg-gray-500/10 transition-colors cursor-pointer border-b border-[var(--color-neutral-200)]"
    >
      <div class="flex items-center gap-2 text-[var(--color-neutral-400)] h-12">
        <div class="rotate-90">
          <MeIcon
            icon="me-icon-s icon-grid-horizontal"
            class="text-inherit"
            :custom-size="12"
          />
        </div>

        <span class="text-sm font-medium">{{ item.label }}</span>

        <button
          v-if="!item?.siteMap"
          class="ml-auto size-12"
          @click.stop="() => handleClick(item)"
        >
          <MeIcon
            icon="me-icon-l icon-eye-slash"
            class="text-inherit cursor-pointer"
            :custom-size="14"
            :color="item.visible
             ? 'var(--ui-primary)'
             : 'var(--color-neutral-200)'"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useSortable} from '@vueuse/integrations/useSortable'
import {shallowRef, toRaw, useTemplateRef, watch} from 'vue'
import MeIcon from '@/components/MeIcon/MeIcon.vue'
import type {NavigationItem} from '@/types'
import {useNavigationStore} from '@/composables/useNavigationStore.ts'

const {
  customNavigationItems,
  setCustomNavigationItems,
  updateNavigationItemsVisible
} = useNavigationStore()

const el = useTemplateRef<HTMLElement>('el')

const list = shallowRef<NavigationItem[]>(customNavigationItems.value || [])

useSortable(el, list, {
  animation: 150,
  ghostClass: 'sortable-ghost',
  chosenClass: 'sortable-chosen',
  dragClass: 'sortable-drag'
})

watch(list, newList => setCustomNavigationItems(toRaw(newList)))

function handleClick(item: NavigationItem) {
  const currentVisibility = item.visible ?? false
  updateNavigationItemsVisible(item, !currentVisibility)
}
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
