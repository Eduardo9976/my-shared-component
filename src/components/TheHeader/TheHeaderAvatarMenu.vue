<template>
  <div class="flex select-none flex-col items-end relative">
    <div ref="menuAvatar" class="rounded-bl-lg bg-white text-sm absolute right-[-8px]">
      <div class="flex justify-between gap-4 px-4 py-2 align-center">
        <div class="grid w-[168px]">
          <p class="truncate">
            {{ user.name }}
          </p>
          <small class="block truncate text-xs text-gray-500">{{
            user.role || user.email || ''
          }}</small>
        </div>
        <div
          ref="avatar"
          class="flex items-center justify-center size-12 rounded-full bg-primary cursor-pointer text-white"
        >
          <span class="text-2xl font-normal">{{ user.acronym }}</span>
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
import { useTemplateRef } from 'vue'
import type { ProfileItem, User } from '@/types'
import TheHeaderAvatarMenuItem from './TheHeaderAvatarMenuItem.vue'

interface Props {
  user: User
  profileItems: ProfileItem[]
  setVisibleToFalse: () => void
}

defineProps<Props>()

const menuAvatar = useTemplateRef<HTMLDivElement>('menuAvatar')
const avatar = useTemplateRef<HTMLDivElement>('avatar')
</script>
