<template>
  <div class="relative flex select-none flex-col items-end">
    <div
      ref="menuAvatar"
      class="absolute rounded-bl-lg bg-white text-sm top-[-1px] right-[-8px]"
    >
      <div class="flex justify-between gap-4 px-4 py-2 align-center">
        <div class="grid w-[168px]">
          <p class="mb-0 truncate text-gray-500">
            {{ user.name }}
          </p>
          <small class="block truncate text-xs text-gray-400">{{
            user.role || user.email || ''
          }}</small>
        </div>
        <div
          ref="avatar"
          class="flex cursor-pointer items-center justify-center rounded-full text-white size-12 bg-primary"
        >
          <span class="text-2xl font-normal no-underline">
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
import {useTemplateRef} from 'vue'
import type {ProfileItem, User} from '@/types'
import TheHeaderAvatarMenuItem from './TheHeaderAvatarMenuItem.vue'
import TheHeaderAvatarChip from '@/components/TheHeader/TheHeaderAvatarChip.vue'

interface Props {
  user: User
  profileItems: ProfileItem[]
  setVisibleToFalse: () => void
}

defineProps<Props>()

const menuAvatar = useTemplateRef<HTMLDivElement>('menuAvatar')
const avatar = useTemplateRef<HTMLDivElement>('avatar')
</script>
