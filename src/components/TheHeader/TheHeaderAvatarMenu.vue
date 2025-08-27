<template>
  <div class="relative flex select-none flex-col items-end">
    <div
      ref="menuContainer"
      class="absolute rounded-bl-lg bg-white text-sm top-[-1px] right-[-8px]"
    >
      <div class="flex justify-between gap-4 py-2 pl-4 align-center">
        <div class="grid w-[168px]">
          <p class="mb-0 truncate text-gray-500">
            {{ user.name }}
          </p>
          <small class="block truncate text-xs text-gray-400">{{
            user.role || user.email || ''
          }}</small>
        </div>
        <div
          ref="avatarMenu"
          class="mx-4 flex items-center justify-center rounded-full border border-transparent size-12 bg-primary"
        >
          <span class="text-2xl font-normal text-white no-underline">
            {{ user.acronym }}
          </span>

          <TheHeaderAvatarChip :user="user" />
        </div>
      </div>

      <TheHeaderAvatarMenuItem
        :profileItems="profileItems"
        :set-visible-to-false="setVisibleToFalse"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTemplateRef, onMounted, onBeforeUnmount} from 'vue'
import type {ProfileItem, User} from '@/types'
import TheHeaderAvatarMenuItem from './TheHeaderAvatarMenuItem.vue'
import TheHeaderAvatarChip from '@/components/TheHeader/TheHeaderAvatarChip.vue'

interface Props {
  user: User
  profileItems: ProfileItem[]
  setVisibleToFalse: () => void
  avatarRef: HTMLDivElement | null
}

const props = defineProps<Props>()

const avatarMenu = useTemplateRef<HTMLDivElement>('avatarMenu')
const menuContainer = useTemplateRef<HTMLDivElement>('menuContainer')

const calculateCenter = (rect: DOMRect) => ({
  x: rect.left + rect.width / 2,
  y: rect.top + rect.height / 2
})

const calculateOffset = (elementRect: DOMRect, containerRect: DOMRect) => ({
  x: elementRect.left - containerRect.left,
  y: elementRect.top - containerRect.top
})

const updateMenuPosition = () => {
  if (!props.avatarRef || !avatarMenu.value || !menuContainer.value) return

  const originalAvatar = props.avatarRef
  const menuAvatar = avatarMenu.value
  const container = menuContainer.value

  const originalCenter = calculateCenter(originalAvatar.getBoundingClientRect())
  const menuAvatarRect = menuAvatar.getBoundingClientRect()
  const menuAvatarCenter = calculateCenter(menuAvatarRect)
  const containerRect = container.getBoundingClientRect()

  const menuAvatarOffset = calculateOffset(menuAvatarRect, containerRect)

  const position = {
    left: originalCenter.x - menuAvatarCenter.x + menuAvatarOffset.x,
    top: originalCenter.y - menuAvatarCenter.y + menuAvatarOffset.y
  }

  Object.assign(container.style, {
    position: 'fixed',
    top: `${position.top}px`,
    left: `${position.left}px`,
    zIndex: '10003',
    right: 'auto'
  })
}

const setupEventListeners = () => {
  const events = ['scroll', 'resize']
  events.forEach(event => window.addEventListener(event, updateMenuPosition))

  return () =>
    events.forEach(event =>
      window.removeEventListener(event, updateMenuPosition)
    )
}

onMounted(() => {
  updateMenuPosition()
  const cleanup = setupEventListeners()

  onBeforeUnmount(cleanup)
})
</script>
