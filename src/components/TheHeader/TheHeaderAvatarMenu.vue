<template>
  <div class="relative flex select-none flex-col items-end">
    <div
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
import {useTemplateRef, onMounted} from 'vue'
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

onMounted(() => {
  if (props.avatarRef && avatarMenu.value) {
    const rect = props.avatarRef.getBoundingClientRect()
    avatarMenu.value.style.top = `${rect.top + rect.height + 8}px`
    avatarMenu.value.style.left = `${rect.left - 150 + rect.width / 2}px`
  }
})
</script>
