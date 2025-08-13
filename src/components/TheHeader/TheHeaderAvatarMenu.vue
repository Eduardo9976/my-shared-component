<template>
  <AppBackdrop v-if="visible">
    <div class="flex select-none flex-col items-end">
      <div ref="menuAvatar" class="rounded-bl-lg bg-white text-sm">
        <div class="flex justify-between gap-4 px-4 py-2 align-center">
          <div class="grid w-[168px]">
            <p class="truncate">
              {{ props.user.name }}
            </p>
            <small class="block truncate text-xs text-gray-500">{{
              props.user.role || props.user.email || ''
            }}</small>
          </div>
          <div
            ref="avatar"
            class="flex items-center justify-center size-12 rounded-full bg-[rgba(0,0,0,0.4)] cursor-pointer text-white bg-primary"
          >
            <span class="text-2xl font-normal">{{ props.user.acronym }}</span>
          </div>
        </div>

        <TheHeaderAvatarMenuItem
          :profileItems="props.profileItems"
          :set-visible-to-false="setVisibleToFalse"
        />
      </div>
    </div>
  </AppBackdrop>
</template>

<script setup lang="ts">
import {onBeforeUnmount, watch, useTemplateRef} from 'vue'
import type {ProfileItem, User} from '@/types'
import AppBackdrop from '@/components/AppBackdrop.vue'
import TheHeaderAvatarMenuItem from './TheHeaderAvatarMenuItem.vue'

interface Props {
  user: User
  profileItems: ProfileItem[]
}

const props = defineProps<Props>()

const visible = defineModel<boolean>('visible')

const menuAvatar = useTemplateRef<HTMLDivElement>('menuAvatar')

const avatar = useTemplateRef<HTMLDivElement>('avatar')

watch(
  () => visible.value,
  newValue => newValue && window.addEventListener('click', handleClick)
)

function setVisibleToFalse() {
  visible.value = false
  window.removeEventListener('click', handleClick)
}

function handleClick(event: MouseEvent) {
  const clickedOutsideMenu =
    menuAvatar.value && !menuAvatar.value.contains(event.target as Node)
  const clickedAvatar =
    avatar.value && avatar.value.contains(event.target as Node)

  if (clickedOutsideMenu || clickedAvatar) {
    setVisibleToFalse()
  }
}

onBeforeUnmount(() => {
  setVisibleToFalse()
})
</script>
