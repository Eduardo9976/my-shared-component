<template>
  <div class="flex flex-col">
    <div class="text-sm text-primary py-2 px-6 bg-[var(--color-blue-50)] rounded-lg mb-2 flex justify-between font-medium">
      <p>Apps fixados no header:</p>
      <span>{{ getCountNavigationItems }}</span>
    </div>

    <div ref="el" class="overflow-y-auto max-h-[280px]">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="hover:bg-gray-500/10 transition-colors cursor-pointer border-b border-[var(--color-neutral-100)] mr-2"
      >
        <div class="flex items-center gap-2 text-[var(--color-neutral-400)] h-12 pl-2">
          <div class="icon-container">
            <MeIcon
              icon="me-icon-s icon-grid-horizontal"
              class="text-inherit"
              :custom-size="12"
            />
          </div>

          <span class="text-label text-sm">{{ item.label }}</span>

          <button
            v-if="!item?.siteMap"
            class="ml-auto size-12"
            @click.stop="() => handleClick(item)"
          >
            <MeIcon
              icon="me-icon-l icon-eye-slash"
              class="button-icon"
              :custom-size="14"
              :color="item.visible
               ? 'var(--ui-primary)'
               : 'var(--color-neutral-200)'"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {shallowRef, toRaw, useTemplateRef, watch, computed} from 'vue'
import {useSortable} from '@vueuse/integrations/useSortable'
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

const getCountNavigationItems = computed(() => {
  const total = customNavigationItems.value?.length
  const actives = customNavigationItems.value?.filter(i => i.visible).length

  return `${actives}/${total}`
})

function addDragClasses(item: HTMLElement) {
  item.classList.add('border', 'border-[var(--ui-primary)]', 'text-[var(--ui-primary)]', 'rounded-lg')
  const textLabel = item.querySelector('.text-label')
  if (textLabel) {
    textLabel.classList.add('text-[var(--ui-primary)]')
  }
  const iconContainer = item.querySelector('.icon-container')
  if (iconContainer) {
    iconContainer.classList.add('text-[var(--ui-primary)]')
  }
  const buttonIcon = item.querySelector('.button-icon')
  if (buttonIcon) {
    buttonIcon.classList.add('text-[var(--ui-primary)]')
  }
}

function removeDragClasses(item: HTMLElement) {
  item.classList.remove('border', 'border-[var(--ui-primary)]', 'text-[var(--ui-primary)]', 'rounded-lg')
  const textLabel = item.querySelector('.text-label')
  if (textLabel) {
    textLabel.classList.remove('text-[var(--ui-primary)]')
  }
  const iconContainer = item.querySelector('.icon-container')
  if (iconContainer) {
    iconContainer.classList.remove('text-[var(--ui-primary)]')
  }
  const buttonIcon = item.querySelector('.button-icon')
  if (buttonIcon) {
    buttonIcon.classList.remove('text-[var(--ui-primary)]')
  }
}

useSortable(el, list, {
  animation: 150,
  scroll: true,
  scrollSensitivity: 30,
  scrollSpeed: 10,
  onStart: (evt: any) => addDragClasses(evt.item),
  onEnd: (evt: any) => removeDragClasses(evt.item),
  onChange: (evt: any) => {
  }
})

watch(list, newList => setCustomNavigationItems(toRaw(newList)))

function handleClick(item: NavigationItem) {
  const currentVisibility = item.visible ?? false
  updateNavigationItemsVisible(item, !currentVisibility)
}
</script>
